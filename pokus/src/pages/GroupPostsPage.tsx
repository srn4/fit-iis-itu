import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../constants";
import "./GroupPostsPage.css";
import { AuthContext } from "../contexts/Authorization";

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
  const { user } = useContext(AuthContext); // Accessing user from AuthContext
  const [group, setGroup] = useState<Group | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

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
        console.log(postsResponse.data.posts);
        setPosts(
          postsResponse.data.posts.map((post: Post) => ({
            ...post,
            likes_count: post.likes_count || 0,
            dislikes_count: post.dislikes_count || 0,
            user_reaction: post.user_reaction || null,
          }))
        );
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
    try {
      const response = await axios.post(`${apiUrl}/api/posts`, {
        user_id: user.id,
        group_id: Number(groupId),
        subject,
        content,
      });
      setPosts([...posts, { ...response.data.post, user }]); // Update the posts list
      setSubject(""); // Reset the subject input
      setContent(""); // Reset the content input
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleReaction = async (postId: number, reaction: string) => {
    try {
      const currentPost = posts.find((post) => post.id === postId);
      if (!currentPost) {
        console.error("Post not found");
        return;
      }

      // Determine if the user is toggling the reaction
      const isTogglingReaction = currentPost.user_reaction === reaction;
      const newReaction = isTogglingReaction ? null : reaction;

      // Send the reaction to the server
      await axios.post(
        `${apiUrl}/api/post/${postId}/react`,
        {
          reaction: newReaction,
        },
        {
          headers: { user_id: user.id.toString() },
        }
      );

      // Update the post's reaction counts
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            let likesCount = post.likes_count;
            let dislikesCount = post.dislikes_count;

            if (newReaction === "like") {
              likesCount++;
              if (currentPost.user_reaction === "dislike") {
                dislikesCount--;
              }
            } else if (newReaction === "dislike") {
              dislikesCount++;
              if (currentPost.user_reaction === "like") {
                likesCount--;
              }
            } else {
              if (isTogglingReaction) {
                if (currentPost.user_reaction === "like") {
                  likesCount--;
                } else {
                  dislikesCount--;
                }
              }
            }

            return {
              ...post,
              likes_count: likesCount,
              dislikes_count: dislikesCount,
              user_reaction: newReaction,
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Error submitting reaction:", error);
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
                  <button
                    className="like-button"
                    onClick={() => handleReaction(post.id, "like")}
                    disabled={post.user_reaction === "like"}
                  >
                    Like
                  </button>
                  <span>{post.likes_count}</span>

                  <button
                    className="dislike-button"
                    onClick={() => handleReaction(post.id, "dislike")}
                    disabled={post.user_reaction === "dislike"}
                  >
                    Dislike
                  </button>
                  <span>{post.dislikes_count}</span>
                </div>
                <div>
                  Likes: {post.likes_count}, Dislikes: {post.dislikes_count}
                  {post.user_reaction && (
                    <p>You have reacted with: {post.user_reaction}</p>
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
            placeholder="Subject"
            className="form-input"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="form-textarea"
          />
          <button type="submit" className="form-submit">
            Zveřejnit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GroupPostsPage;
