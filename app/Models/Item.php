<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = [
        'name', 'slug', 'category', 'effect',
        'stat_atk_mod', 'stat_spa_mod', 'stat_def_mod', 'stat_spd_mod', 'stat_spe_mod',
        'damage_mod', 'phys_damage_mod', 'spec_damage_mod',
        'type_mod', 'boost_type', 'super_effective_mod',
    ];

    protected $casts = [
        'stat_atk_mod'         => 'float',
        'stat_spa_mod'         => 'float',
        'stat_def_mod'         => 'float',
        'stat_spd_mod'         => 'float',
        'stat_spe_mod'         => 'float',
        'damage_mod'           => 'float',
        'phys_damage_mod'      => 'float',
        'spec_damage_mod'      => 'float',
        'type_mod'             => 'float',
        'super_effective_mod'  => 'float',
    ];
}
