<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'login' => 'required|string|max:255|unique:users',
            'password' => 'required|string',
        ]);

        $user = User::create([
            'login' => $validatedData['login'],
            'password' => Hash::make($validatedData['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        Log::info('User registered', ['user' => $user]);

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    public function login(Request $request)
{
    try {
        $request->validate([
            'login' => 'required', // Using 'login' instead of 'email'
            'password' => 'required',
        ]);

        $user = User::where('login', $request->login)->first(); // Change to 'login'

        if (!$user || !password_verify($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'login' => ['The provided credentials are incorrect.'], // Changed to 'login'
            ]);
        }

        // Add a debug log here
        Log::info('User logged in', ['user' => $user]);

        return response()->json([
            'token' => $user->createToken('authToken')->plainTextToken
        ]);
    } catch (ValidationException $e) {
        // Add a debug log for any exceptions
        Log::error('Login error: ' . $e->getMessage());
        return response()->json(['error' => 'An error occurred during login.'], 500);
    }
}



    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        Log::info('User logged out', ['user' => $request->user()]);

        return response()->json(['message' => 'Logged out'])->withCookie(Cookie::forget('authToken'));
    }

    
}

