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

    public function store(Request $request){
        
    }
}
