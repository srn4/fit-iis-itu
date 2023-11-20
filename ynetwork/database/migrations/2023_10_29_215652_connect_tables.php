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
                $table->unsignedBigInteger('reactsTo')->nullable(); // Změněno na 'unsignedInteger' pro foreign klíč
                $table->foreign('reactsTo')->references('id')->on('post')->onDelete('cascade')->onUpdate('cascade'); // Nastavení foreign klíče
            }
            
            if(!Schema::hasColumn('post', 'group_id')){
                $table->unsignedBigInteger('group_id')->nullable(); 
                $table->foreign('group_id')->references('id')->on('_group')->onDelete('cascade')->onUpdate('cascade');
            }
            //$table->foreign('groupid')->references('id')->on('group'); // Nastavení foreign klíče
            //$table->foreign('userid')->references('id')->on('user'); // Nastavení foreign klíče
        });
    }

    public function down()
    {
        Schema::table('post', function (Blueprint $table) {
            if (Schema::hasColumn('post', 'reactsTo')){
                //$table->dropForeign(['reactsTo']);
                
            }
            if (Schema::hasColumn('post', 'group_id')){
                //$table->dropForeign(['group_id']);
                
            }; 
            $table->dropColumn(['reactsTo']); //maybe
            $table->dropColumn(['group_id']);
        });
    }
};
//$table->dropColumn(['userid']);
//$table->unsignedInteger('reactsTo')->nullable(); // Změněno na 'unsignedInteger' pro foreign klíč