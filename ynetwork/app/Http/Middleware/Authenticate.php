<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // Import the Log facade

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        // Log the received cookies
        Log::info('Received Cookies:', $request->cookies->all());

        return $request->expectsJson() ? null : route('login');
    }
}
