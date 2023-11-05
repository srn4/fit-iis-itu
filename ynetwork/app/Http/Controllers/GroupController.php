<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function create(Request $request)
    {
        // Your logic to handle the creation of a group
        $groupName = $request->input('name'); // Access 'name' from the request

        // Example: create a new group in the database
        // Your logic here...

        return response()->json(['message' => 'Group created successfully']);
    }
}
