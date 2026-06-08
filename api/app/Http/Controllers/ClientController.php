<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->clients;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string',
        ]);

        $client = $request->user()->clients()->create($validated);

        return response()->json($client, 201);
    }

    public function update(Request $request, Client $client)
    {
        abort_if($client->user_id !== $request->user()->id, 403);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        $client->update($validated);

        return response()->json($client);
    }

    public function destroy(Request $request, Client $client)
    {
        abort_if($client->user_id !== $request->user()->id, 403);

        if ($client->invoices()->exists()) {
            return response()->json([
                'message' => 'Cannot delete a client with existing invoices.',
            ], 409);
        }

        $client->delete();

        return response()->json([
            'message' => 'Client deleted successfully'
        ]);
    }
}
