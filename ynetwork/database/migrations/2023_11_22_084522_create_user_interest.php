<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

DB::statement('SET SESSION sql_require_primary_key=0');

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_interest', function (Blueprint $table) {
            $table->timestamps();

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('interest_id');

            $table->primary(['user_id','interest_id']);

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('interest_id')->references('id')->on('interest')->onDelete('cascade')->onUpdate('cascade');
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
