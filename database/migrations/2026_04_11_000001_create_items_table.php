<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->string('category');
            $table->text('effect');

            // Stat multipliers (applied to the relevant attacking/defending stat)
            $table->decimal('stat_atk_mod', 5, 3)->default(1.000);
            $table->decimal('stat_spa_mod', 5, 3)->default(1.000);
            $table->decimal('stat_def_mod', 5, 3)->default(1.000);
            $table->decimal('stat_spd_mod', 5, 3)->default(1.000);
            $table->decimal('stat_spe_mod', 5, 3)->default(1.000);

            // Damage multipliers
            $table->decimal('damage_mod',           5, 3)->default(1.000); // all moves (Life Orb)
            $table->decimal('phys_damage_mod',      5, 3)->default(1.000); // physical only (Muscle Band)
            $table->decimal('spec_damage_mod',      5, 3)->default(1.000); // special only (Wise Glasses)
            $table->decimal('type_mod',             5, 3)->default(1.000); // specific type boost
            $table->string('boost_type')->nullable();                       // e.g. "Fire", "Water"
            $table->decimal('super_effective_mod',  5, 3)->default(1.000); // Expert Belt

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
