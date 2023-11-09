<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('post', function (Blueprint $table) {
            if (!Schema::hasColumn('post', 'reactsTo')){
                $table->unsignedInteger('reactsTo')->nullable(); // Změněno na 'unsignedInteger' pro foreign klíč
                $table->foreign('reactsTo')->references('id')->on('post'); // Nastavení foreign klíče
            }
            
            
            //$table->foreign('groupid')->references('id')->on('group'); // Nastavení foreign klíče
            //$table->foreign('userid')->references('id')->on('user'); // Nastavení foreign klíče
        });
    }

    public function down()
    {
        Schema::table('post', function (Blueprint $table) {
            if (Schema::hasColumn('post', 'reactsTo')){
                $table->dropForeign(['reactsTo']);
                //$table->dropColumn(['reactsTo']); //maybe
            }
            
            $table->dropForeign(['groupid']);
            $table->dropForeign(['userid']);
        });//$table->unsignedInteger('reactsTo')->nullable(); // Změněno na 'unsignedInteger' pro foreign klíč
    }
};
