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
        Schema::table("_group", function (Blueprint $table) {
            if(!Schema::hasColumn('_group', 'interest_id')) {
                $table->unsignedBigInteger('interest_id')->nullable();
                $table->foreign('interest_id')->references('id')->on('interest');
            }
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('_group', function (Blueprint $table) {
            if(!Schema::hasColumn('_group', 'interest_id')){
                $table->dropForeign('interest_id');
                $table->dropColumn('interest_id');
            }
        });
    }
};