<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ClientController;

Route::get('/invoices', [InvoiceController::class, 'index']);
Route::post('/invoices', [InvoiceController::class, 'store']);
Route::put('/invoices/{invoice}', [InvoiceController::class, 'update']);
Route::delete('/invoices/{invoice}', [InvoiceController::class, 'destroy']);
Route::get('/invoices/{invoice}', [InvoiceController::class, 'show']);


Route::get('/clients', [ClientController::class, 'index']);
Route::post('/clients', [ClientController::class, 'store']);
Route::put('/clients/{client}', [ClientController::class, 'update']);
Route::delete('/clients/{client}', [ClientController::class, 'destroy']);

