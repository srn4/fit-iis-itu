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
        Schema::create('post', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->integer('likes')->default(0);
            $table->integer('dislikes')->default(0);
            $table->string('content');
            $table->string('subject');

            $table->unsignedBigInteger('reacts_to')->nullable();
            $table->foreign('reacts_to')->references('id')->on('post')->onDelete('cascade')->onUpdate('cascade');
            
            $table->unsignedBigInteger('group_id');
            $table->foreign('group_id')->references('id')->on('_group')->onDelete('cascade')->onUpdate('cascade');

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');

            $table->boolean('is_verified')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post');
    }
};
