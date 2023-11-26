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

    public function requestMod(Request $request, $groupId)
    {
        $userId = $request->header('user_id');

        // Check if the user is already a mod or has a pending mod request
        $existingMod = GroupMember::where('user_id', $userId)
            ->where('group_id', $groupId)
            ->whereIn('role', ['mod', 'mod_request'])
            ->exists();

        if ($existingMod) {
            return response()->json(['message' => 'User is already a mod or has a pending mod request.']);
        }

        // Create a new GroupMember record with role 'mod_request'
        $groupMember = new GroupMember([
            'user_id' => $userId,
            'group_id' => $groupId,
            'role' => 'mod_request',
        ]);

        $groupMember->save();

        return response()->json(['message' => 'Moderator request sent successfully.']);
    }

    public function getUserGroups(Request $request){
        $userId = $request->header('user_id');

        $memberGroups = GroupMember::where('user_id', $userId)
        ->whereIn('role', ['member'])
        ->with(['group:id,name,description'])
        ->get();

        return response()->json(['member_groups' => $memberGroups]);
    }

    public function getAdminGroups(Request $request)
    {
        $userId = $request->header('user_id');

        $adminGroups = GroupMember::where('user_id', $userId)
            ->whereIn('role', ['admin'])
            ->with('group:id,name,description')
            ->get();

        return response()->json(['admin_groups' => $adminGroups]);
    }

    public function getMembershipReq(Request $request, $groupId = null){
        $userId = $request->header('user_id');
        $isAdmin = GroupMember::where('user_id', $userId)->where('role','admin')->exists();
        if(!$isAdmin){
            return response()->json(['message'=> 'You are not authorized'], 403);
        }
        $membershipRequests = GroupMember::where('role', 'member_request')
        ->whereIn('group_id', function ($query) use ($userId) {
            $query->select('group_id')
                ->from('group_member')
                ->where('user_id', $userId)
                ->where('role', 'admin');
        })
        ->with(['group:id,name,description', 'user:id,login'])
        ->get();
        return response()->json(['membership_requests'=> $membershipRequests]);
    }

    public function getModReq(Request $request, $groupId = null)
    {
        $userId = $request->header('user_id');

        $isAdmin = GroupMember::where('user_id', $userId)->where('role', 'admin')->exists();

        if (!$isAdmin) {
            return response()->json(['message' => 'You are not authorized'], 403);
        }

        $moderatorRequests = GroupMember::where('user_id', $userId)
            ->where('role', 'mod_request')
            ->when($groupId, function ($query) use ($groupId) {
                $query->where('group_id', $groupId);
            })
            ->with(['group:id,name,description', 'user:id,login'])
            ->get();

        return response()->json(['moderator_requests' => $moderatorRequests]);
    }
}
