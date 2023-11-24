<?php

namespace App\Http\Controllers;
use App\Models\Interest;
use Illuminate\Http\Request;

class InterestController extends Controller
{
    public function index(){
        $interest = Interest::all();
        return response()->json($interest);
    }
    public function create(Request $request){
        $validated = $request->validate([
            "name"=> "required|string|max:255"
        ]);

        $interest = Interest::create($validated);
        return response()->json($interest);
    }

    public function read($id){
        $interest = Interest::findOrFail($id);
        return response()->json($interest);
    }

    public function update(Request $request, $id){
        $interest = Interest::findOrFail($id);
        $validated = $request->validate([
            "name"=> "sometimes|string|max:255"
        ]);
        $interest->update($validated);
        return response()->json($interest);
    }

    public function delete($id){
        $interest = Interest::findOrFail($id);
        $interest->delete();
        return response()->json(['message'=>'interest deleted succesfully']);
    }
}
