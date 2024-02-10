<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        $githubUser = Socialite::driver($provider)->stateless()->user();
        $githubUser = User::updateOrCreate([
            'provider_id' => $githubUser->id,
            'provider' => $provider,
        ], [
            'name' => $githubUser->name,
            'email' => $githubUser->email,
            'provider_token' => $githubUser->token,
            'provider_refresh_token' => $githubUser->refreshToken,
        ]);

        Auth::login($githubUser);
        return Inertia::render("LoginSuccess", [
            "username" => Auth::user()->name
        ]);
    }
}
