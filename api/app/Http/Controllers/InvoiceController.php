<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()
            ->invoices()
            ->with(['client', 'items'])
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'status' => 'nullable|string',
            'issue_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'notes' => 'nullable|string',

            'items' => 'required|array|min:1',
            'items.*.description' => 'required|string|max:255',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
        ]);

        $invoice = DB::transaction(function () use ($validated, $request) {
            $totalAmount = collect($validated['items'])->sum(function ($item) {
                return $item['quantity'] * $item['unit_price'];
            });

            $invoice = $request->user()->invoices()->create([
                'client_id' => $validated['client_id'],
                'invoice_number' => 'INV-' . now()->format('Y') . '-' . str_pad(Invoice::count() + 1, 4, '0', STR_PAD_LEFT),
                'amount' => $totalAmount,
                'status' => $validated['status'] ?? 'draft',
                'issue_date' => $validated['issue_date'] ?? null,
                'due_date' => $validated['due_date'] ?? null,
                'notes' => $validated['notes'] ?? null,
            ]);

            foreach ($validated['items'] as $item) {
                $invoice->items()->create([
                    'description' => $item['description'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total' => $item['quantity'] * $item['unit_price'],
                ]);
            }

            return $invoice;
        });

        return response()->json($invoice->load(['client', 'items']), 201);
    }

    public function update(Request $request, Invoice $invoice)
    {
        abort_if($invoice->user_id !== request()->user()->id, 403);

        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'status' => 'required|string',
            'issue_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.description' => 'required|string',
            'items.*.quantity' => 'required|numeric|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
        ]);

        $amount = collect($validated['items'])->sum(function ($item) {
            return $item['quantity'] * $item['unit_price'];
        });

        $invoice->update([
            'client_id' => $validated['client_id'],
            'status' => $validated['status'],
            'issue_date' => $validated['issue_date'] ?? null,
            'due_date' => $validated['due_date'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'amount' => $amount,
        ]);

        $invoice->items()->delete();

        foreach ($validated['items'] as $item) {
            $invoice->items()->create([
                'description' => $item['description'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'total' => $item['quantity'] * $item['unit_price'],
            ]);
        }

        return response()->json(
            $invoice->load(['client', 'items'])
        );
    }

    public function destroy(Invoice $invoice)
    {
        abort_if($invoice->user_id !== request()->user()->id, 403);

        $invoice->delete();

        return response()->json([
            'message' => 'Invoice deleted successfully'
        ]);
    }

    public function show(Invoice $invoice)
    {
        abort_if($invoice->user_id !== request()->user()->id, 403);

        return response()->json(
            $invoice->load(['client', 'items'])
        );
    }
}
