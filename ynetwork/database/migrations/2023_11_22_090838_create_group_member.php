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
        Schema::create('group_member', function (Blueprint $table) {
            $table->timestamps();

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('group_id');

            $table->primary(['user_id','group_id']);
            $table->foreign('user_id')->references('id')->on('user')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('group_id')->references('id')->on('_group')->onDelete('cascade')->onUpdate('cascade');

            $table->enum('role', ['user', 'admin', 'mod'])->default('user');

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
