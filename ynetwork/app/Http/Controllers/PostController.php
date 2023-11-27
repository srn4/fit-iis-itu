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
            'content' => 'required|string',
            'subject' => 'required|string|max:255'
        ]);
        $post = Post::create($request->all());

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
        $posts = Post::where('group_id', $group_id)->get();

        if ($posts->count() === 0) {
            return response()->json(['message' => 'No posts found for the specified group.'], 200);
        }

        return response()->json(['post' => $posts]);
    }

    public function reactToPost(Request $request, $postId)
    {
        $userId = $request->header('user_id'); // Get the user ID from the request header

        // Check if the user already reacted to the post
        $existingReaction = PostLike::where('user_id', $userId)
            ->where('post_id', $postId)
            ->first();

        if ($existingReaction) {
            // User already reacted, update the reaction
            $existingReaction->update([
                'reaction' => $request->input('reaction')
            ]);

            return response()->json(['message' => 'Reaction updated successfully.']);
        }

        // User is reacting for the first time, create a new record
        PostLike::create([
            'user_id' => $userId,
            'post_id' => $postId,
            'reaction' => $request->input('reaction')
        ]);

        return response()->json(['message' => 'Reaction added successfully.']);
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
