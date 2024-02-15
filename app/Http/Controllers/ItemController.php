<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;
use Inertia\Inertia;
use Predis\Connection\ConnectionException;

class ItemController extends Controller
{

    public static function createOrderList()
    {
        $order = Order::where("user_id", Auth::user()->id)
            ->get();
        $order_list = [];
        foreach ($order as $value) {
            $subTotal = $value->order_amount * $value->item->cost;
            $formattedSubTotal = number_format($subTotal, 2);

            // Remove trailing zeros for the decimal part
            $formattedSubTotal = filter_var($formattedSubTotal, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
            $singleOrder = [
                "id" => $value->item->id,
                "name" => $value->item->name,
                "level" => $value->item->level,
                "cost" => $value->item->cost,
                "order_amount" => $value->order_amount,
                "subTotal" => floatval($formattedSubTotal)
            ];
            $order_list[] = $singleOrder;
        }
        return $order_list;
    }

    public static function getRedisConnection()
    {
        try {
            return Redis::connection();
        } catch (ConnectionException $e) {
            return $e;
        }
    }

    public function printOrder()
    {
        if (env("APP_ENV") === 'production') {
            try {
                $redis = self::getRedisConnection();
                $cachedOrder = $redis->get("user_" . Auth::user()->id);
                if (isset($cachedOrder)) {
                    $order = json_decode($cachedOrder, FALSE);
                    return Inertia::render("Cart", [
                        "items" => $order
                    ]);
                } else {
                    $order = self::createOrderList();
                    self::getTotalOrderInCart();
                    Redis::set("user_" . Auth::user()->id, json_encode($order));
                    return Inertia::render("Cart", [
                        "items" => $order
                    ]);
                }
            } catch (ConnectionException $e) {
                $order = self::createOrderList();
                self::getTotalOrderInCart();
                return Inertia::render("Cart", [
                    "items" => $order
                ]);
            }
        } else {
            $order = self::createOrderList();
            self::getTotalOrderInCart();
            return Inertia::render("Cart", [
                "items" => $order
            ]);
        }
    }

    public function order(Request $request)
    {
        $order_request = [
            "user_id" => Auth::user()->id,
            "item_id" => $request->itemId,
            "order_amount" => intval($request->order_amount)
        ];

        Order::create($order_request);
        session()->flash('flash_message', 'Order created successfully');
        $this->getTotalOrderInCart();

        return redirect('/market')->with([
            "message" => "Order " . $request->itemName . " successfully"
        ]);
    }

    public static function getTotalOrderInCart()
    {
        $order = Order::where("user_id", Auth::user()->id)->get();
        if ($order) {
            session()->put("totalOrderInCart", count($order));
        }
        return null;
    }

    public function deleteOrderItem(Request $request)
    {
        $order = Order::where("item_id", $request->itemId);
        if (!$order) {
            abort(404);
        }
        $order->delete();
        self::getTotalOrderInCart();
        return redirect("/cart");
    }
}
