<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'item_id',
        'order_amount',
        'payment_intent'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function item()
    {
        return $this->belongsTo(Items::class, "item_id");
    }
}
