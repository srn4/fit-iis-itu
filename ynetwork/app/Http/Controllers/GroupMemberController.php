<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\GroupMember;


class GroupMemberController extends Controller
{
    public function requestMembership(Request $request, $groupId){

        $userId = $request->header('user_id');
        //$user = User::find($userId);
        \Log::info('user_id from headers: ' . $userId);
        $existingMembership = GroupMember::where('user_id', $userId)
            ->where('group_id', $groupId)
            ->whereIn('role', ['member','member_request'])
            ->exists();

        if($existingMembership){
            return response()->json(['message' => 'user is already a member or has pending request']);
        }

        $groupMember = new GroupMember([
            'user_id'=> $userId,
            'group_id'=> $groupId,
            'role'=> 'member_request',
        ]);

        $groupMember->save();

        return response()->json(['message' => 'Membership request sent successfully.']);
    }
}
