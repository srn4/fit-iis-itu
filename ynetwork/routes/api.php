<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\InterestController;
use App\Http\Controllers\GroupMemberController;
use App\Http\Controllers\UserInterestController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/




Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/validateToken', [AuthController::class, 'validateToken']);


//UserController routes
//get all users
Route::get('/users', [UserController::class,'index']);
//get one user by id
Route::get('/users/{id}', [UserController::class,'getUser']);
//update one user with id
Route::put('/users/{id}', [UserController::class,'updateUser']);
//delete user by id
Route::delete('/users/{id}', [UserController::class,'deleteUser']);


//PostController routes
//index
Route::get('/posts', [PostController::class, 'index']);
//create post
Route::post('/posts', [PostController::class, 'create']);
//read one post by id
Route::get('/posts/{id}', [PostController::class,'read']);
//update one post by id
Route::put('/posts/{id}', [PostController::class,'update']);
//delete one post by id
Route::delete('/posts/{id}', [PostController::class,'delete']);
//get posts in group
Route::get('/posts-in-group/{group_id}', [PostController::class, 'getPostGroup']);
//react to post
/* call example 
const postId = 1; // Replace with the actual post ID
const reaction = 'like'; // 'like' or 'dislike'
axios.post(`${apiUrl}/api/post/${postId}/react`, { reaction }); 

*/
Route::post('/post/{postId}/react', [PostController::class, 'reactToPost']);
//get reaction count
Route::get('/post/{postId}/reactions/{reaction}', [PostController::class, 'countReactions']);
//delete react
Route::delete('/unreact-post/{postId}', [PostController::class, 'unreactPost']);

//GroupController routes
Route::get('/groups', [GroupController::class, 'index']);
Route::post('/groups', [GroupController::class, 'create']);
Route::get('/groups/{id}', [GroupController::class, 'read']);
Route::put('/groups/{id}', [GroupController::class, 'update']);
Route::delete('/groups/{id}', [GroupController::class, 'delete']);

//GroupMemberController routes
//send group membership request
Route::post('/group-register/{groupId}/', [GroupMemberController::class,'requestMembership']);
//send mod request
Route::post('/group-mod-request/{groupId}', [GroupMemberController::class, 'requestMod']);
//get member groups
Route::get('/user-groups', [GroupMemberController::class, 'getUserGroups']);
//get admin groups
Route::get('/admin-groups', [GroupMemberController::class, 'getAdminGroups']);
//get group membership requests
Route::get('/membership-requests/{groupId?}', [GroupMemberController::class, 'getMembershipReq']);
//get mod reqs
Route::get('/moderator-requests/{groupId?}', [GroupMemberController::class, 'getModReq']);
//decline member request
Route::delete('/decline-membership/{groupId}/{userId}', [GroupMemberController::class, 'declineMembershipRequest']);
//decline mod request
Route::delete('/decline-mod-request/{groupId}/{userId}', [GroupMemberController::class, 'declineModRequest']);
//accept member req
Route::patch('/set-member/{groupId}/{userId}', [GroupMemberController::class, 'setMember']);
//accept mod req
Route::patch('/set-mod/{groupId}/{userId}', [GroupMemberController::class, 'setMod']);

//Interest routes, tbd
Route::get('/interests', [InterestController::class, 'index']);
Route::post('/interests', [InterestController::class, 'create']);
Route::get('/interests/{id}', [InterestController::class, 'read']);
Route::put('/interests/{id}', [InterestController::class, 'update']);
Route::delete('/interests/{id}', [InterestController::class, 'delete']);

//user interest controllers
/* arguments passed in a request body like this:
{
  "user_id": 1,
  "interest_id": 1
}
 */
Route::post('/add-interest', [UserInterestController::class, 'addInterest']);
//get user interests, user id passed in request
Route::get('/user-interests', [UserInterestController::class, 'getUserInterests']);


/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Ensure you're using the correct middleware for authentication, such as 'auth:sanctum' for Laravel Sanctum
Route::middleware('auth:sanctum')->get('/auth/user', function (Request $request) {
    return $request->user(); // Returns the authenticated user's information
});
Route::middleware('auth:sanctum')->get('/auth/verify', function (Request $request) {
    return response()->json([
        'authenticated' => true,
        'user' => $request->user() // Add this line to include user data in the response
    ]);
});*/   


