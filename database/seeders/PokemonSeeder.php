<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PokemonSeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('data/pokemon.json');
        $data = json_decode(file_get_contents($path), true);

        $now = now();
        $chunks = array_chunk($data, 100);

        foreach ($chunks as $chunk) {
            DB::table('pokemon')->insert(
                array_map(fn($p) => array_merge($p, [
                    'created_at' => $now,
                    'updated_at' => $now,
                ]), $chunk)
            );
        }

        $this->command->info('Seeded ' . count($data) . ' Pokemon.');
    }
}
