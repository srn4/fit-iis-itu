<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Models\PostLike;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return response()->json(['posts' => $posts]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'user_id' => 'required|numeric',
            'group_id' => 'required|numeric',
            'content' => 'required|string',
            'subject' => 'required|string|max:255'
        ]);
        $post = Post::create($request->all());

        $post->load('user');

        return response()->json(['post' => $post], 201);
    }

    public function read($id)
    {
        $post = Post::findOrFail($id);
        return response()->json(['post' => $post]);
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $request->validate([
            'content' => 'sometimes|string',
            'title' => 'sometimes|max:255'
        ]);
        $post->update($request->all());
        return response()->json(['post' => $post]);
    }
    public function delete($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return response()->json(['message' => 'succesful deletion']);
    }

    public function getPostGroup(Request $request, $group_id)
    {
        $userId = $request->header('user_id'); // You may want to use auth()->id() if you're using Laravel's authentication.

        $posts = Post::where('group_id', $group_id)
            ->with('user')
            ->withCount([
                'likes as likes_count',
                'likes as dislikes_count' => function ($query) {
                    $query->where('reaction', 'dislike');
                }
            ])
            ->get();

        // Optionally, add the user's reaction to each post
        foreach ($posts as $post) {
            $userReaction = $post->likes()
                ->where('user_id', $userId)
                ->first();
            $post->user_reaction = $userReaction ? $userReaction->reaction : null;
        }

        return response()->json(['posts' => $posts]);
    }


    public function reactToPost(Request $request, $postId)
    {
        $userId = $request->header('user_id'); // Or use auth()->id() if you're using Laravel's authentication

        // Validate the reaction input
        $validatedData = $request->validate([
            'reaction' => 'nullable|in:like,dislike'
        ]);

        $reaction = $validatedData['reaction'];

        // Check if the user already reacted to the post
        $existingReaction = PostLike::where('post_id', $postId)
                                ->where('user_id', $userId)
                                ->first();

        if ($existingReaction) {
            if ($existingReaction->reaction === $reaction || $reaction === null) {
                // Remove the reaction if it's the same or if new reaction is null
                $existingReaction->delete();
            } else {
                // Update the reaction if different
                $existingReaction->update(['reaction' => $reaction]);
            }
        } else {
            if ($reaction !== null) {
                // Create a new reaction record
                PostLike::create([
                    'user_id' => $userId,
                    'post_id' => $postId,
                    'reaction' => $reaction
                ]);
            }
        }

        // Fetch updated counts
        $post = Post::with('user')->findOrFail($postId);
        $likes_count = $post->likes()->where('reaction', 'like')->count();
        $dislikes_count = $post->likes()->where('reaction', 'dislike')->count();

        return response()->json([
            'message' => 'Reaction updated successfully.',
            'likes_count' => $likes_count,
            'dislikes_count' => $dislikes_count,
            'user_reaction' => $reaction
        ]);
    }



    public function countReactions(Request $request, $postId, $reaction)
    {
        // Check if the provided reaction is valid (like or dislike)
        if (!in_array($reaction, ['like', 'dislike'])) {
            return response()->json(['message' => 'Invalid reaction type.'], 400);
        }

        // Count the number of reactions for the given post and reaction
        $reactionCount = PostLike::where('post_id', $postId)
            ->where('reaction', $reaction)
            ->count();

        return response()->json(['count' => $reactionCount]);
    }
    //tbd check the post model funcs
    /* public function reactToPost(Request $request, $post_id, $reaction){
        $post = Post::findOrFail($post_id);
        if (!in_array($reaction, ['like','dislike'])){
            return response()->json(['message'=> 'invalid reaction'], 400);
        }
        $isReacted = $post-> */
}
