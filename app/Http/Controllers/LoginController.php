<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function index()
    {
        return Inertia::render("Login");
    }

    public function store(Request $request)
    {
        $credentials = $request->validate([
            "email" => 'required|email',
            "password" => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            sleep(2);
            return Inertia::render("LoginSuccess", [
                "username" => Auth::user()->name
            ]);
        }
        return back()->withErrors([
            "message" => "Invalid credentials"
        ]);
    }

    public function destroy(Request $request)
    {
        Auth::logout();
        return redirect('login');
    }
}
