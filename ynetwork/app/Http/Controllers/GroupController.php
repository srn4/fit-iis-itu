<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group; 

class GroupController extends Controller
{
    public function index()
    {
        $groups = Group::all();

        return response()->json($groups);
    }

    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'description'=> 'required|max:255',
            'interest_id'=>'sometimes|integer',
            'user_id'=>'sometimes|integer'
        ]);

        $group = Group::create($validatedData);

        return response()->json(['message' => 'Group created successfully', 'group' => $group]);
    }

    public function read($id){
        $group = Group::findOrFail($id);
        return response()->json(['group'=>$group]);
    }

    public function update(Request $request, $id){
        $group = Group::findOrFail($id);
        $validatedData = $request->validate([
            'name'=> 'sometimes|string|max:255',
            'description'=> 'sometimes|string|max:255',
            'interest_id'=> 'sometimes|integer'
        ]);
        $group->update($validatedData);
        return response()->json(['message'=> 'Group updated succesfully','group'=> $group]);
    }

    public function delete($id){
        $group = Group::findOrFail($id);
        $group->delete();
        return response()->json(['message'=> 'group deleted succesfully']);
    }
}
