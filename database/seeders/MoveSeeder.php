<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MoveSeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('data/moves.json');
        $data = json_decode(file_get_contents($path), true);

        $now = now();
        $chunks = array_chunk($data, 100);

        foreach ($chunks as $chunk) {
            DB::table('moves')->insert(
                array_map(fn($m) => array_merge($m, [
                    'created_at' => $now,
                    'updated_at' => $now,
                ]), $chunk)
            );
        }

        $this->command->info('Seeded ' . count($data) . ' moves.');
    }
}
