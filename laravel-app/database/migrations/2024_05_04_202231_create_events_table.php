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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('org_id')->nullable();
            $table->string('name');
            $table->string('image');
            $table->string('event_id');
            $table->date('event_date');
            $table->integer('capacity');
            $table->unsignedBigInteger('ticket_price');
            $table->string('venue');
            $table->time('time');
            $table->string('qr_code')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
