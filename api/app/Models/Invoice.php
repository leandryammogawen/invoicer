<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'invoice_number',
        'client_name',
        'amount',
        'is_paid',
        'status',
        'issue_date',
        'due_date',
        'notes',
    ];
}
