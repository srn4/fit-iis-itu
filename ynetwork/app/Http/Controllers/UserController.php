<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class UserController extends Controller
{
    //get all users for admin
    public function index(){
        $users = User::all();

        return response()->json(['users' => $users]);
    }

    //get one user by id 
    public function getUser ($id){
        $user = User::find($id);

        if(!$user){
            return response()->json(['error'=>'User not found'], 404);
        }
        return response()->json(['user'=> $user]);
    }

    
    public function updateUser ($id, Request $request){
        $user = User::find($id);
        if(!$user){
            return response()->json(['error'=> 'user not found'],404);
        }
        $request->validate([
            'name'=> 'sometimes|string|max:255',
            'surname'=> 'sometimes|string|max:255',
            'login'=> 'sometimes|email|unique:users,email,'. $user->id,
            'password'=> 'sometimes|string',
            'role'=>'sometimes|in:user,admin',
            'isVerified'=>'sometimes|boolean',
            'isVisible'=> 'sometimes|boolean',
            ]);

        $user->update($request->all());
        return response()->json(['user'=> $user], 200);
    }

    public function deleteUser ($id){
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message'=> 'user deleted succesfully'], 200);
    }
}
