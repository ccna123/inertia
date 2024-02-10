<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CheckOutController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LoginController;
use App\Models\Items;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render("Welcome");
});
Route::get('/register', function () {
    return Inertia::render("Register");
});
Route::get('/market', function () {
    return Inertia::render("Market", [
        "items" => Items::query()
            ->when(Request::input('search'), function ($query,  $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->paginate(5)
            ->withQueryString()
            ->through(fn ($item) => [
                "id" => $item->id,
                "image_url" => $item->image_url,
                "name" => $item->name,
                "level" => $item->level,
                "cost" => $item->cost,
                "amount_in_storage" => $item->amount_in_storage
            ]),
        "filter" => Request::only(['search'])
    ]);
});
Route::post('/register', function () {
    sleep(2);
    //validation
    $formAttr = Request::validate([
        "name" => "required",
        "password" => "required",
        "email" => "required|email",
    ]);

    User::create($formAttr);
    return redirect("/market");
});
Route::get('/login', [LoginController::class, 'index'])->name("login");
Route::post('/login', [LoginController::class, 'store'])->name("login");

Route::get('/auth/{github}/redirect', [AuthController::class, 'redirect'])->name("github_oauth");
Route::get('/auth/{github}/callback', [AuthController::class, 'callback'])->name("github_oauth");



Route::middleware('auth')->group(function () {

    Route::post('/logout', [LoginController::class, 'destroy']);



    // ----------------------Item Controller--------------------------
    Route::get('/cart', [ItemController::class, "printOrder"]);
    Route::get('/getTotalOrderInCart', [ItemController::class, 'getTotalOrderInCart']);
    Route::post('/order', [ItemController::class, 'order']);
    Route::post('/deleteOrderItem', [ItemController::class, 'deleteOrderItem']);




    // ----------------------Checkout Controller--------------------------
    Route::group(['prefix' => "checkout"], function () {
        Route::get("/", [CheckOutController::class, "checkout"])->name("checkout");
        Route::get("/success", [CheckOutController::class, "checkout_success"])->name("checkout_success");
        Route::get("/fail", [CheckOutController::class, "checkout_failure"])->name("checkout_failure");
    });
    Route::get("/receipt", [CheckOutController::class, "exportReceipt"]);
});
