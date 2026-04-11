<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Move extends Model
{
    protected $fillable = [
        'name', 'slug', 'type', 'category',
        'power', 'accuracy', 'pp', 'effect', 'probability',
    ];
}
