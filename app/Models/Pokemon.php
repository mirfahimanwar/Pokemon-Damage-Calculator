<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pokemon extends Model
{
    protected $table = 'pokemon';

    protected $fillable = [
        'national_dex', 'name', 'slug', 'type1', 'type2',
        'hp', 'attack', 'defense', 'special_attack', 'special_defense', 'speed',
        'image_url',
    ];
}
