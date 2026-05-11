<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->string('invoice_number')->nullable()->after('id');
            $table->string('status')->default('draft')->after('amount');
            $table->date('issue_date')->nullable()->after('status');
            $table->date('due_date')->nullable()->after('issue_date');
            $table->text('notes')->nullable()->after('due_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn([
                'invoice_number',
                'status',
                'issue_date',
                'due_date',
                'notes',
            ]);
        });
    }
};
