<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group; // Adjust namespace based on your model's location

class GroupController extends Controller
{
    public function index()
    {
        // Fetch all groups
        $groups = Group::all(); // Assuming the Group model exists

        return response()->json($groups);
    }

    public function create(Request $request)
    {
        // Validate and store a new group
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            // Add other validation rules for group creation fields
        ]);

        $group = Group::create($validatedData);

        return response()->json(['message' => 'Group created successfully', 'group' => $group]);
    }
}
