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
        Schema::create('user_interest', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');


            // Define the second foreign key
            $table->unsignedBigInteger('interest_id');

            $table->primary(['user_id', 'interest_id']);

            $table->foreign('interest_id')->references('id')->on('interest');
            $table->foreign('user_id')->references('id')->on('user');
            // Primary key composed of the two foreign keys
            

            // Timestamps
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_interest');
    }
};