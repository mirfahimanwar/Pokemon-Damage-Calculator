<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('pokemon', function (Blueprint $table) {
            $table->id();
            $table->unsignedSmallInteger('national_dex');
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('type1');
            $table->string('type2')->nullable();
            $table->unsignedSmallInteger('hp');
            $table->unsignedSmallInteger('attack');
            $table->unsignedSmallInteger('defense');
            $table->unsignedSmallInteger('special_attack');
            $table->unsignedSmallInteger('special_defense');
            $table->unsignedSmallInteger('speed');
            $table->string('image_url');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pokemon');
    }
};

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pokemon', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pokemon');
    }
};
