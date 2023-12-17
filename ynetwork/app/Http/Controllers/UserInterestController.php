<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserInterest;

class UserInterestController extends Controller
{
    //

    public function addInterest(Request $request)
    {
        // Validate the request data
        $request->validate([
            'user_id' => 'required|exists:users,id', // Assuming users table has 'id' field
            'interest_id' => 'required|exists:interest,id', // Assuming interests table has 'id' field
        ]);

        // Check if the user already has this interest
        $existingInterest = UserInterest::where('user_id', $request->user_id)
            ->where('interest_id', $request->interest_id)
            ->first();

        if ($existingInterest) {
            return response()->json(['message' => 'User already has this interest'], 422);
        }

        // Create a new UserInterest record
        UserInterest::create([
            'user_id' => $request->user_id,
            'interest_id' => $request->interest_id,
        ]);

        return response()->json(['message' => 'Interest added successfully']);
    }



    

    /**
     * Get all interests of a user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserInterests(Request $request)
    {
        // Validate the request data
        $request->validate([
            'user_id' => 'required|exists:users,id', // Assuming users table has 'id' field
        ]);

        // Retrieve all interests of the user with interest names
        $userInterests = UserInterest::where('user_id', $request->user_id)
            ->with('interest') // Eager load the 'interest' relationship
            ->get();

        // Extract interest names from the relationships
        $interests = $userInterests->map(function ($userInterest) {
            return [
                'interest_id' => $userInterest->interest_id,
                'interest_name' => $userInterest->interest->name,
            ];
        });

        return response()->json(['user_interests' => $interests]);
    }
}
