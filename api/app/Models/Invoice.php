<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'client_id',
        'invoice_number',
        'amount',
        'is_paid',
        'status',
        'issue_date',
        'due_date',
        'notes',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
