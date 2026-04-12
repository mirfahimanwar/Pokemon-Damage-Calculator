<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AltFormSeeder extends Seeder
{
    public function run(): void
    {
        $forms = [
            // Alolan forms
            ['national_dex'=>26,  'name'=>'Alolan Raichu',         'slug'=>'alolan-raichu',        'type1'=>'Electric','type2'=>'Psychic', 'hp'=>60, 'attack'=>85,  'defense'=>50,  'special_attack'=>95,  'special_defense'=>85,  'speed'=>110, 'image_url'=>'https://img.pokemondb.net/artwork/avif/large/raichu-alolan.avif'],
            ['national_dex'=>38,  'name'=>'Alolan Ninetales',      'slug'=>'alolan-ninetales',     'type1'=>'Ice',     'type2'=>'Fairy',   'hp'=>73, 'attack'=>67,  'defense'=>75,  'special_attack'=>81,  'special_defense'=>100, 'speed'=>109, 'image_url'=>'https://img.pokemondb.net/artwork/avif/large/ninetales-alolan.avif'],
            // Hisuian forms
            ['national_dex'=>59,  'name'=>'Hisuian Arcanine',      'slug'=>'arcanine-hisuian',     'type1'=>'Fire',    'type2'=>'Rock',    'hp'=>95, 'attack'=>115, 'defense'=>80,  'special_attack'=>95,  'special_defense'=>80,  'speed'=>90,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/arcanine-hisuian.avif'],
            ['national_dex'=>157, 'name'=>'Hisuian Typhlosion',    'slug'=>'typhlosion-hisuian',   'type1'=>'Fire',    'type2'=>'Ghost',   'hp'=>73, 'attack'=>84,  'defense'=>78,  'special_attack'=>119, 'special_defense'=>85,  'speed'=>95,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/typhlosion-hisuian.avif'],
            ['national_dex'=>503, 'name'=>'Hisuian Samurott',      'slug'=>'samurott-hisuian',     'type1'=>'Water',   'type2'=>'Dark',    'hp'=>90, 'attack'=>108, 'defense'=>80,  'special_attack'=>100, 'special_defense'=>65,  'speed'=>85,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/samurott-hisuian.avif'],
            ['national_dex'=>571, 'name'=>'Hisuian Zoroark',       'slug'=>'zoroark-hisuian',      'type1'=>'Normal',  'type2'=>'Ghost',   'hp'=>55, 'attack'=>100, 'defense'=>60,  'special_attack'=>125, 'special_defense'=>60,  'speed'=>110, 'image_url'=>'https://img.pokemondb.net/artwork/avif/large/zoroark-hisuian.avif'],
            ['national_dex'=>706, 'name'=>'Hisuian Goodra',        'slug'=>'goodra-hisuian',       'type1'=>'Steel',   'type2'=>'Dragon',  'hp'=>80, 'attack'=>100, 'defense'=>100, 'special_attack'=>110, 'special_defense'=>150, 'speed'=>60,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/goodra-hisuian.avif'],
            ['national_dex'=>713, 'name'=>'Hisuian Avalugg',       'slug'=>'avalugg-hisuian',      'type1'=>'Ice',     'type2'=>'Rock',    'hp'=>95, 'attack'=>127, 'defense'=>184, 'special_attack'=>34,  'special_defense'=>36,  'speed'=>38,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/avalugg-hisuian.avif'],
            ['national_dex'=>724, 'name'=>'Hisuian Decidueye',     'slug'=>'decidueye-hisuian',    'type1'=>'Grass',   'type2'=>'Fighting','hp'=>88, 'attack'=>112, 'defense'=>80,  'special_attack'=>95,  'special_defense'=>95,  'speed'=>60,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/decidueye-hisuian.avif'],
            // Galarian forms
            ['national_dex'=>80,  'name'=>'Galarian Slowbro',      'slug'=>'slowbro-galarian',     'type1'=>'Poison',  'type2'=>'Psychic', 'hp'=>95, 'attack'=>100, 'defense'=>95,  'special_attack'=>100, 'special_defense'=>70,  'speed'=>30,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/slowbro-galarian.avif'],
            ['national_dex'=>199, 'name'=>'Galarian Slowking',     'slug'=>'slowking-galarian',    'type1'=>'Poison',  'type2'=>'Psychic', 'hp'=>95, 'attack'=>65,  'defense'=>80,  'special_attack'=>110, 'special_defense'=>110, 'speed'=>30,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/slowking-galarian.avif'],
            ['national_dex'=>618, 'name'=>'Galarian Stunfisk',     'slug'=>'stunfisk-galarian',    'type1'=>'Ground',  'type2'=>'Steel',   'hp'=>109,'attack'=>81,  'defense'=>99,  'special_attack'=>66,  'special_defense'=>84,  'speed'=>32,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/stunfisk-galarian.avif'],
            // Paldean Tauros
            ['national_dex'=>128, 'name'=>'Tauros (Combat Breed)', 'slug'=>'tauros-paldea-combat', 'type1'=>'Fighting','type2'=>null,      'hp'=>75, 'attack'=>110, 'defense'=>105, 'special_attack'=>30,  'special_defense'=>70,  'speed'=>100, 'image_url'=>'https://img.pokemondb.net/artwork/avif/large/tauros-paldea-combat.avif'],
            ['national_dex'=>128, 'name'=>'Tauros (Blaze Breed)',  'slug'=>'tauros-paldea-blaze',  'type1'=>'Fighting','type2'=>'Fire',    'hp'=>75, 'attack'=>110, 'defense'=>105, 'special_attack'=>30,  'special_defense'=>70,  'speed'=>100, 'image_url'=>'https://img.pokemondb.net/artwork/avif/large/tauros-paldea-blaze.avif'],
            ['national_dex'=>128, 'name'=>'Tauros (Aqua Breed)',   'slug'=>'tauros-paldea-aqua',   'type1'=>'Fighting','type2'=>'Water',   'hp'=>75, 'attack'=>110, 'defense'=>105, 'special_attack'=>30,  'special_defense'=>70,  'speed'=>100, 'image_url'=>'https://img.pokemondb.net/artwork/avif/large/tauros-paldea-aqua.avif'],
            // Rotom appliance forms
            ['national_dex'=>479, 'name'=>'Rotom (Heat Rotom)',    'slug'=>'rotom-heat',           'type1'=>'Electric','type2'=>'Fire',    'hp'=>50, 'attack'=>65,  'defense'=>107, 'special_attack'=>105, 'special_defense'=>107, 'speed'=>86,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/rotom-heat.avif'],
            ['national_dex'=>479, 'name'=>'Rotom (Wash Rotom)',    'slug'=>'rotom-wash',           'type1'=>'Electric','type2'=>'Water',   'hp'=>50, 'attack'=>65,  'defense'=>107, 'special_attack'=>105, 'special_defense'=>107, 'speed'=>86,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/rotom-wash.avif'],
            ['national_dex'=>479, 'name'=>'Rotom (Frost Rotom)',   'slug'=>'rotom-frost',          'type1'=>'Electric','type2'=>'Ice',     'hp'=>50, 'attack'=>65,  'defense'=>107, 'special_attack'=>105, 'special_defense'=>107, 'speed'=>86,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/rotom-frost.avif'],
            ['national_dex'=>479, 'name'=>'Rotom (Fan Rotom)',     'slug'=>'rotom-fan',            'type1'=>'Electric','type2'=>'Flying',  'hp'=>50, 'attack'=>65,  'defense'=>107, 'special_attack'=>105, 'special_defense'=>107, 'speed'=>86,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/rotom-fan.avif'],
            ['national_dex'=>479, 'name'=>'Rotom (Mow Rotom)',     'slug'=>'rotom-mow',            'type1'=>'Electric','type2'=>'Grass',   'hp'=>50, 'attack'=>65,  'defense'=>107, 'special_attack'=>105, 'special_defense'=>107, 'speed'=>86,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/rotom-mow.avif'],
            // Lycanroc forms
            ['national_dex'=>745, 'name'=>'Lycanroc (Midnight Form)', 'slug'=>'lycanroc-midnight', 'type1'=>'Rock',    'type2'=>null,      'hp'=>85, 'attack'=>115, 'defense'=>75,  'special_attack'=>55,  'special_defense'=>75,  'speed'=>82,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/lycanroc-midnight.avif'],
            ['national_dex'=>745, 'name'=>'Lycanroc (Dusk Form)',  'slug'=>'lycanroc-dusk',        'type1'=>'Rock',    'type2'=>null,      'hp'=>75, 'attack'=>117, 'defense'=>65,  'special_attack'=>55,  'special_defense'=>65,  'speed'=>110, 'image_url'=>'https://img.pokemondb.net/artwork/avif/large/lycanroc-dusk.avif'],
            // Meowstic Female
            ['national_dex'=>678, 'name'=>'Meowstic (Female)',     'slug'=>'meowstic-f',           'type1'=>'Psychic', 'type2'=>null,      'hp'=>74, 'attack'=>48,  'defense'=>76,  'special_attack'=>83,  'special_defense'=>81,  'speed'=>104, 'image_url'=>'https://img.pokemondb.net/artwork/avif/large/meowstic-f.avif'],
            // Gourgeist size forms
            ['national_dex'=>711, 'name'=>'Gourgeist (Small Size)','slug'=>'gourgeist-small',      'type1'=>'Ghost',   'type2'=>'Grass',   'hp'=>55, 'attack'=>85,  'defense'=>122, 'special_attack'=>58,  'special_defense'=>75,  'speed'=>99,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/gourgeist-small.avif'],
            ['national_dex'=>711, 'name'=>'Gourgeist (Large Size)','slug'=>'gourgeist-large',      'type1'=>'Ghost',   'type2'=>'Grass',   'hp'=>75, 'attack'=>95,  'defense'=>122, 'special_attack'=>58,  'special_defense'=>75,  'speed'=>69,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/gourgeist-large.avif'],
            ['national_dex'=>711, 'name'=>'Gourgeist (Super Size)','slug'=>'gourgeist-super',      'type1'=>'Ghost',   'type2'=>'Grass',   'hp'=>85, 'attack'=>100, 'defense'=>122, 'special_attack'=>58,  'special_defense'=>75,  'speed'=>54,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/gourgeist-super.avif'],
            // Basculegion Female
            ['national_dex'=>902, 'name'=>'Basculegion (Female)',  'slug'=>'basculegion-f',        'type1'=>'Water',   'type2'=>'Ghost',   'hp'=>120,'attack'=>92,  'defense'=>65,  'special_attack'=>100, 'special_defense'=>75,  'speed'=>78,  'image_url'=>'https://img.pokemondb.net/artwork/avif/large/basculegion-f.avif'],
        ];

        foreach ($forms as $form) {
            DB::table('pokemon')->insertOrIgnore(array_merge($form, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
