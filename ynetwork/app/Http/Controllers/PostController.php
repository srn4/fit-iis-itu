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
        $userId = $request->header('user_id');

        // Validate the reaction input
        $validatedData = $request->validate([
            'reaction' => 'nullable|in:like,dislike'
        ]);

        $newReaction = $validatedData['reaction'];

        // Check if the user already reacted to the post
        $existingReaction = PostLike::where('post_id', $postId)
            ->where('user_id', $userId)
            ->first();

        if ($existingReaction) {
            if ($existingReaction->reaction === $newReaction || $newReaction === null) {
                // Update the existing reaction if it's different or if the new reaction is null
                $existingReaction->reaction = $newReaction;
                $existingReaction->save();
            } else {
                // Remove the existing reaction if the new reaction is different
                $primaryKeyValues = $existingReaction->getAttributes(); // Get primary key values as an array
                \Log::info("Existing reaction found. Primary Key Values: " . json_encode($primaryKeyValues));

                // Adjust the line below to use the composite primary key values
                PostLike::where($primaryKeyValues)->delete();

                PostLike::create([
                    'user_id' => $userId,
                    'post_id' => $postId,
                    'reaction' => $newReaction
                ]);

            }
        } else {
            if ($newReaction !== null) {
                // Create a new reaction record
                PostLike::create([
                    'user_id' => $userId,
                    'post_id' => $postId,
                    'reaction' => $newReaction
                ]);
            }
        }

        return response()->json(['message' => 'Reaction processed successfully']);
    }


    public function unreactPost(Request $request, $postId)
    {
        // Validate the request
        $request->validate([
            'reaction' => 'required|string|in:like,dislike', // Adjust the valid reaction types as needed
        ]);

        // Get the user ID from the request header
        $userId = $request->header('user_id');

        // Log information for debugging
        \Log::info("Request received for unreactPost. User ID: $userId, Post ID: $postId, Reaction: {$request->input('reaction')}");

        // Check if a reaction exists before attempting to delete
        try {
            $existingReaction = PostLike::where([
                ['post_id', '=', $postId],
                ['user_id', '=', $userId],
                ['reaction', '=', $request->input('reaction')],
            ])->first();

            // Log information for debugging
            if ($existingReaction) {
                $primaryKeyValues = $existingReaction->getAttributes(); // Get primary key values as an array
                \Log::info("Existing reaction found. Primary Key Values: " . json_encode($primaryKeyValues));

                // Adjust the line below to use the composite primary key values
                PostLike::where($primaryKeyValues)->delete();

                \Log::info("Reaction deleted successfully.");
                return response()->json(['message' => 'Reaction deleted successfully']);
            } else {
                \Log::info("No existing reaction found, doing nothing.");
                return response()->json(['message' => 'No existing reaction found']);
            }

            // Rest of the controller code...

        } catch (\Exception $e) {
            // Log the exception for debugging
            \Log::error("Exception caught: {$e->getMessage()}");

            // Return a generic error response
            return response()->json(['error' => 'An error occurred while processing the request.'], 500);
        }
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
