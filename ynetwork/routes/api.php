<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;


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



//Route::post('/create-group', 'GroupController@create');
Route::get('/groups', 'App\Http\Controllers\GroupController@index');
Route::post('/create-group', [GroupController::class, 'create']);
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


//GroupController routes
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


