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

    /**
     * Request to become a mod or change role to mod_request.
     *
     * @param Request $request
     * @param int $groupId
     * @return \Illuminate\Http\JsonResponse
     */
    public function requestMod(Request $request, $groupId)
    {
        $userId = $request->header('user_id');

        // Find the existing record for the user and group
        $existingMod = GroupMember::where('user_id', $userId)
            ->where('group_id', $groupId)
            ->where('role', 'member')
            ->first();

        if ($existingMod) {
            // If the user already has a role as a member, update it to 'mod_request'
            GroupMember::updateOrInsert(
                ['user_id' => $userId, 'group_id' => $groupId],
                ['role' => 'mod_request', 'updated_at' => now()]
            );
            return response()->json(['message' => 'Role updated to mod_request successfully.']);
        }

        return response()->json(['message' => 'User is not a member or already has a mod role.']);
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

    /**
     * Decline membership request.
     *
     * @param Request $request
     * @param int $groupId
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function declineMembershipRequest(Request $request, $groupId, $userId)
    {
        $adminId = $request->header('user_id');

        // Check if the user making the request is an admin
        $isAdmin = GroupMember::where('user_id', $adminId)->where('role', 'admin')->exists();

        if (!$isAdmin) {
            return response()->json(['message' => 'You are not authorized to decline membership requests.'], 403);
        }

        // Remove the membership request from the group_member table
        GroupMember::where('user_id', $userId)
            ->where('group_id', $groupId)
            ->where('role', 'member_request')
            ->delete();

        return response()->json(['message' => 'Membership request declined successfully.']);
    }

    /**
     * Decline mod request.
     *
     * @param Request $request
     * @param int $groupId
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function declineModRequest(Request $request, $groupId, $userId)
    {
        $adminId = $request->header('user_id');

        // Check if the user making the request is an admin
        $isAdmin = GroupMember::where('user_id', $adminId)->where('role', 'admin')->exists();

        if (!$isAdmin) {
            return response()->json(['message' => 'You are not authorized to decline mod requests.'], 403);
        }

        // Remove the mod request from the group_member table
        GroupMember::where('user_id', $userId)
            ->where('group_id', $groupId)
            ->where('role', 'mod_request')
            ->delete();

        return response()->json(['message' => 'Mod request declined successfully.']);
    }

    /**
     * Set user role to member.
     *
     * @param Request $request
     * @param int $groupId
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function setMember(Request $request, $groupId, $userId)
    {
        $adminId = $request->header('user_id');

        // Check if the user making the request is an admin
        $isAdmin = GroupMember::where('user_id', $adminId)->where('role', 'admin')->exists();

        if (!$isAdmin) {
            return response()->json(['message' => 'You are not authorized to set user roles.'], 403);
        }

        // Update the role to member from member_request
        GroupMember::where('user_id', $userId)
            ->where('group_id', $groupId)
            ->where('role', 'member_request')
            ->update(['role' => 'member']);

        return response()->json(['message' => 'User role set to member successfully.']);
    }

    /**
     * Set user role to mod.
     *
     * @param Request $request
     * @param int $groupId
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function setMod(Request $request, $groupId, $userId)
    {
        $adminId = $request->header('user_id');

        // Check if the user making the request is an admin
        $isAdmin = GroupMember::where('user_id', $adminId)->where('role', 'admin')->exists();

        if (!$isAdmin) {
            return response()->json(['message' => 'You are not authorized to set user roles.'], 403);
        }

        // Update the role to mod from mod_request
        GroupMember::where('user_id', $userId)
            ->where('group_id', $groupId)
            ->where('role', 'mod_request')
            ->update(['role' => 'mod']);

        return response()->json(['message' => 'User role set to mod successfully.']);
    }
}
