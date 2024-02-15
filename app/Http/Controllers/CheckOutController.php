<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Stripe\Exception\InvalidRequestException;

class CheckOutController extends Controller
{
    public function checkout()
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SK'));
        $order_list = ItemController::createOrderList();

        $lineItems = [];
        foreach ($order_list as $order) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $order['name'],
                    ],
                    'unit_amount' => $order['cost'] * 100,
                ],
                'quantity' => $order['quantity'],
            ];
        }


        $checkout_session = $stripe->checkout->sessions->create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route("checkout_success", [], true) . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route("checkout_failure", [], true),
        ]);
        return Inertia::location($checkout_session->url);
    }

    public function checkout_success(Request $request)
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SK'));

        try {
            $session = $stripe->checkout->sessions->retrieve($request->get('session_id'));
            if (!$session) {
                return Inertia::render("CheckOutFailure");
            }

            $payment_intent = $session->payment_intent;
            $orders = Order::where("user_id", Auth::user()->id)->get();
            if ($orders->isEmpty()) {
                abort(404, 'Order not found');
            }

            foreach ($orders as $order) {
                $order->payment_intent = $payment_intent;
                $order->save();
            }

            Payment::create([
                "payment_intent" => $payment_intent,
                "status" => "paid"
            ]);

            return Inertia::render("CheckOutSuccess", [
                "customer_name" => $session->customer_details->name
            ]);
        } catch (InvalidRequestException $e) {
            return Inertia::render("CheckOutFailure");
        } catch (\Exception $e) {
            return Inertia::render("CheckOutFailure");
        }
    }

    public function exportReceipt()
    {
        $pdf = Pdf::loadview("receipt", [
            "title" => "haha",
            "order" => ItemController::createOrderList()
        ]);
        return $pdf->stream("receipt.pdf");
    }
}
