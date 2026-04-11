<?php

namespace App\Http\Controllers;

use App\Models\Pokemon;
use Illuminate\Http\Request;

class PokemonController extends Controller
{
    public function index(Request $request)
    {
        $query = Pokemon::query()->orderBy('national_dex');

        if ($search = $request->get('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        return $query->select(
            'id', 'national_dex', 'name', 'slug', 'type1', 'type2', 'image_url',
            'hp', 'attack', 'defense', 'special_attack', 'special_defense', 'speed'
        )->get();
    }

    public function show(int $id)
    {
        return Pokemon::findOrFail($id);
    }
}
