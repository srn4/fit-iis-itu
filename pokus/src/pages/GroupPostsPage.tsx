import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../constants";
import "./GroupPostsPage.css";
import { AuthContext } from "../contexts/Authorization";
const MAX_CONTENT_LENGTH = 255;

// Define the expected properties of the group object
interface Group {
  id: number;
  name: string;
  description: string;
}
interface User {
  id: number;
  login: string;
}

interface Post {
  id: number;
  created_at: string;
  updated_at: string;
  content: string;
  subject: string;
  reacts_to: number | null;
  group_id: number;
  user_id: number;
  is_verified: boolean;
  user: User;
  likes_count: number;
  dislikes_count: number;
  user_reaction: string | null;
}

const GroupPostsPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { user } = useContext(AuthContext);
  const [group, setGroup] = useState<Group | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        // Fetch group details
        const groupResponse = await axios.get(
          `${apiUrl}/api/groups/${groupId}`
        );
        setGroup(groupResponse.data.group);

        // Fetch posts for the group
        const postsResponse = await axios.get(
          `${apiUrl}/api/posts-in-group/${groupId}`
        );
        setPosts(postsResponse.data.posts); // Assuming the posts include user_reaction
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    if (groupId) {
      fetchGroupDetails();
    }
  }, [groupId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (content.length > MAX_CONTENT_LENGTH) {
      setErrorMessage(
        `Content exceeds the maximum length of ${MAX_CONTENT_LENGTH} characters.`
      );
      return;
    }

    setErrorMessage(""); // Clear error message on successful validation

    try {
      const response = await axios.post(`${apiUrl}/api/posts`, {
        user_id: user.id,
        group_id: Number(groupId),
        subject,
        content,
      });
      // Initialize likes and dislikes count for the new post
      const newPost = {
        ...response.data.post,
        user,
        likes_count: 0,
        dislikes_count: 0,
        user_reaction: null,
      };
      setPosts([...posts, newPost]);
      setSubject("");
      setContent("");
      setSubmissionSuccess(true);
      setTimeout(() => setSubmissionSuccess(false), 3000); // Reset after 3 seconds
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleReaction = async (postId: number, reaction: string) => {
    try {
      const currentPost = posts.find((post) => post.id === postId);
      if (!currentPost || currentPost.user_reaction === reaction) {
        // If the user has already reacted with this reaction, do nothing
        return;
      }

      // Send the reaction to the server
      await axios.post(
        `${apiUrl}/api/post/${postId}/react`,
        { reaction },
        { headers: { user_id: user.id.toString() } }
      );

      // Update the local state
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            let likesCount = post.likes_count;
            let dislikesCount = post.dislikes_count;

            if (reaction === "like") {
              likesCount++;
              if (currentPost.user_reaction === "dislike") {
                dislikesCount--;
              }
            } else if (reaction === "dislike") {
              dislikesCount++;
              if (currentPost.user_reaction === "like") {
                likesCount--;
              }
            } 

            return {
              ...post,
              likes_count: likesCount,
              dislikes_count: dislikesCount,
              user_reaction: reaction,
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Error handling reaction:", error);
    }
};


const removeReaction = async (postId: number) => {
  try {
    const currentPost = posts.find((post) => post.id === postId);
    if (!currentPost || !currentPost.user_reaction) {
      // If the user has not reacted, do nothing
      return;
    }

    // Send a request to remove the reaction, including the reaction type
    await axios.delete(`${apiUrl}/api/unreact-post/${postId}?reaction=${currentPost.user_reaction}`, {
      headers: { user_id: user.id.toString() }
    });

    // Update local state
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes_count: post.user_reaction === "like" ? post.likes_count - 1 : post.likes_count,
            dislikes_count: post.user_reaction === "dislike" ? post.dislikes_count - 1 : post.dislikes_count,
            user_reaction: null
          };
        }
        return post;
      })
    );
  } catch (error) {
    console.error("Error removing reaction:", error);
  }
};


  if (!group) {
    return <div>Loading group details...</div>;
  }
  return (
    <div className="body-background">
      <h1 className="group-title">Přispěvky ve skupině: {group.name}</h1>
      <div className="main-container">
        <div className="group-posts-container">
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.id} className="post-item">
                <span className="post-subject">{post.subject}</span>
                <p className="post-content">{post.content}</p>
                <p className="post-user">Přidal: {post.user.login}</p>
                <div className="reaction-buttons">
                  <button onClick={() => handleReaction(post.id, "like")} className="like-button">
                    Like
                  </button>
                  <span>{post.likes_count}</span>
                  <button onClick={() => handleReaction(post.id, "dislike")} className="dislike-button">
                    Dislike
                  </button>
                  <span>{post.dislikes_count}</span>
                  {post.user_reaction && (
                    <button onClick={() => removeReaction(post.id)} className="remove-reaction">
                      odstranit reakci
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="post-form">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Téma"
            className="form-input"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Obsah příspěvku"
            className="form-textarea"
          />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="form-submit">
            Zveřejnit
          </button>
          {submissionSuccess && <span className="submit-success-icon">✔️</span>}
        </form>
      </div>
    </div>
  );
};

export default GroupPostsPage;
