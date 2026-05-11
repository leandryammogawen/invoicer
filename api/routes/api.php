<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InvoiceController;

Route::get('/invoices', [InvoiceController::class, 'index']);
Route::post('/invoices', [InvoiceController::class, 'store']);
Route::put('/invoices/{invoice}', [InvoiceController::class, 'update']);
Route::delete('/invoices/{invoice}', [InvoiceController::class, 'destroy']);

