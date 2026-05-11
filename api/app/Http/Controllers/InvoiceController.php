<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index()
    {
        return Invoice::all();
    }

    public function store(Request $request)
    {
        $invoice = Invoice::create([
            'client_name' => $request->client_name,
            'amount' => $request->amount,
            'is_paid' => false,
        ]);

        return response()->json($invoice);
    }

    public function update(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'is_paid' => 'boolean',
        ]);

        $invoice->update($validated);

        return response()->json($invoice);
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();

        return response()->json([
            'message' => 'Invoice deleted successfully'
        ]);
    }
}
