<?php
enum Status
{
    case UNPAID;
    case PAID;
    public function getPaymentStatus(): string
    {
        return match ($this) {
            Status::UNPAID => 'unpaid',
            Status::PAID => 'paid',
        };
    }
}
