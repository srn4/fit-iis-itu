<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(){
        $posts = Post::all();
        return response()->json(['posts'=> $posts]);
    }

    public function create(Request $request){
        $request->validate([
            'content'=> 'required|string',
            'subject'=> 'required|string|max:255'
        ]);
        $post = Post::create($request->all());

        return response()->json(['post'=> $post],201);
    }

    public function read($id){
        $post = Post::findOrFail($id);
        return response()->json(['post'=> $post]);
    }

    public function update(Request $request, $id){
        $post = Post::findOrFail($id);
        $request->validate([
            'content'=> 'sometimes|string',
            'title'=>'sometimes|max:255'
        ]);
        $post->update($request->all());
        return response()->json(['post'=> $post]);
    }
    public function delete($id){
        $post = Post::findOrFail($id);
        $post->delete();
        return response()->json(['message'=> 'succesful deletion']);
    }

    public function getPostGroup(Request $request, $group_id){
        $posts = Post::where('group_id', $group_id)->get();
        return response()->json(['post'=> $posts]);
    }


    //tbd check the post model funcs
    /* public function reactToPost(Request $request, $post_id, $reaction){
        $post = Post::findOrFail($post_id);
        if (!in_array($reaction, ['like','dislike'])){
            return response()->json(['message'=> 'invalid reaction'], 400);
        }
        $isReacted = $post-> */
}
