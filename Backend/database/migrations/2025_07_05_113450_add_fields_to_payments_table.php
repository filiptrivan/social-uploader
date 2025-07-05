<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->string('user_email', 70)->after('id');
            $table->decimal('amount_paid', 18, 2)->after('user_email');
            $table->string('currency', 20)->after('amount_paid');
        });
    }

    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropColumn(['user_email', 'amount_paid', 'currency']);
        });
    }
};
