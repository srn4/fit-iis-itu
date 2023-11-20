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
        Schema::create('group_member', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');

            $table->foreign('user_id')->references('id')->on('user');

            // Define the second foreign key
            $table->unsignedBigInteger('group_id');
            $table->foreign('group_id')->references('id')->on('_group');

            // Primary key composed of the two foreign keys
            $table->primary(['user_id', 'group_id']);

            // Other columns for the table
            $table->enum('role', ['user', 'admin', 'mod'])->default('user');

            // Timestamps
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('group_member');
    }
};
