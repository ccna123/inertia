<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function chat()
    {
        $friendList = User::where("id", "!=", Auth::user()->id)->get(["id", "name"]);
        return Inertia::render("Chat", compact('friendList'));
    }
}
