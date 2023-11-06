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
        if(!Schema::hasTable('post')){
            Schema::create('post', function (Blueprint $table) {
                $table->id();
                $table->integer('likes');
                $table->integer('dislikes');
                $table->string('content');
                $table->string('subject');
                $table->unsignedInteger('reactsTo')->nullable(); // Změněno na 'unsignedInteger' pro foreign klíč
                $table->unsignedInteger('groupid'); // Změněno na 'unsignedInteger' pro foreign klíč
                $table->unsignedInteger('userid'); // Změněno na 'unsignedInteger' pro foreign klíč
                $table->boolean('isVerified');
            });
        }
        /* Schema::table('post', function (Blueprint $table) {
            $table->foreign('reactsTo')->references('id')->on('post'); // Nastavení foreign klíče
            $table->foreign('groupid')->references('id')->on('group'); // Nastavení foreign klíče
            $table->foreign('userid')->references('id')->on('user'); // Nastavení foreign klíče
        }); */
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('post')) {
            Schema::dropIfExists('post');
        }
    }
};
