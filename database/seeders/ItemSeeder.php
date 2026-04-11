<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            // ── Choice Items ──────────────────────────────────────────────────────
            [
                'name' => 'Choice Band', 'slug' => 'choice-band', 'category' => 'Choice Items',
                'effect' => '+50% Attack; locked to one move.',
                'stat_atk_mod' => 1.5,
            ],
            [
                'name' => 'Choice Specs', 'slug' => 'choice-specs', 'category' => 'Choice Items',
                'effect' => '+50% Sp. Atk; locked to one move.',
                'stat_spa_mod' => 1.5,
            ],
            [
                'name' => 'Choice Scarf', 'slug' => 'choice-scarf', 'category' => 'Choice Items',
                'effect' => '+50% Speed; locked to one move. (No damage change.)',
                'stat_spe_mod' => 1.5,
            ],

            // ── Damage Boosters ───────────────────────────────────────────────────
            [
                'name' => 'Life Orb', 'slug' => 'life-orb', 'category' => 'Damage Boosters',
                'effect' => '+30% to all damage output; lose 1/10 HP each attack.',
                'damage_mod' => 1.3,
            ],
            [
                'name' => 'Expert Belt', 'slug' => 'expert-belt', 'category' => 'Damage Boosters',
                'effect' => '+20% damage on super-effective hits.',
                'super_effective_mod' => 1.2,
            ],
            [
                'name' => 'Muscle Band', 'slug' => 'muscle-band', 'category' => 'Damage Boosters',
                'effect' => '+10% damage on Physical moves.',
                'phys_damage_mod' => 1.1,
            ],
            [
                'name' => 'Wise Glasses', 'slug' => 'wise-glasses', 'category' => 'Damage Boosters',
                'effect' => '+10% damage on Special moves.',
                'spec_damage_mod' => 1.1,
            ],
            [
                'name' => 'Punching Glove', 'slug' => 'punching-glove', 'category' => 'Damage Boosters',
                'effect' => '+10% damage on punching moves. (Treated as +10% Physical here.)',
                'phys_damage_mod' => 1.1,
            ],

            // ── Defensive Items ───────────────────────────────────────────────────
            [
                'name' => 'Assault Vest', 'slug' => 'assault-vest', 'category' => 'Defensive',
                'effect' => '+50% Sp. Def; cannot use status moves.',
                'stat_spd_mod' => 1.5,
            ],
            [
                'name' => 'Eviolite', 'slug' => 'eviolite', 'category' => 'Defensive',
                'effect' => '+50% Def and Sp. Def (not-fully-evolved Pokémon only).',
                'stat_def_mod' => 1.5, 'stat_spd_mod' => 1.5,
            ],
            [
                'name' => 'Rocky Helmet', 'slug' => 'rocky-helmet', 'category' => 'Defensive',
                'effect' => 'Damages attacker 1/6 HP on contact. (No defensive stat change.)',
            ],
            [
                'name' => 'Focus Sash', 'slug' => 'focus-sash', 'category' => 'Defensive',
                'effect' => 'Survive any KO hit at full HP with 1 HP. (No damage number change.)',
            ],
            [
                'name' => 'Leftovers', 'slug' => 'leftovers', 'category' => 'Defensive',
                'effect' => 'Restore 1/16 HP each turn. (No damage number change.)',
            ],
            [
                'name' => 'Heavy-Duty Boots', 'slug' => 'heavy-duty-boots', 'category' => 'Defensive',
                'effect' => 'Immune to entry hazard damage. (No damage number change.)',
            ],

            // ── Type Boosters (+20% to specific type) ─────────────────────────────
            [
                'name' => 'Silk Scarf', 'slug' => 'silk-scarf', 'category' => 'Type Boosters',
                'effect' => '+20% to Normal-type moves.',
                'type_mod' => 1.2, 'boost_type' => 'Normal',
            ],
            [
                'name' => 'Charcoal', 'slug' => 'charcoal', 'category' => 'Type Boosters',
                'effect' => '+20% to Fire-type moves.',
                'type_mod' => 1.2, 'boost_type' => 'Fire',
            ],
            [
                'name' => 'Mystic Water', 'slug' => 'mystic-water', 'category' => 'Type Boosters',
                'effect' => '+20% to Water-type moves.',
                'type_mod' => 1.2, 'boost_type' => 'Water',
            ],
            [
                'name' => 'Magnet', 'slug' => 'magnet', 'category' => 'Type Boosters',
                'effect' => '+20% to Electric-type moves.',
                'type_mod' => 1.2, 'boost_type' => 'Electric',
            ],
            [
                'name' => 'Miracle Seed', 'slug' => 'miracle-seed', 'category' => 'Type Boosters',
                'effect' => '+20% to Grass-type moves.',
                'type_mod' => 1.2, 'boost_type' => 'Grass',
            ],
            [
                'name' => 'Never-Melt Ice', 'slug' => 'never-melt-ice', 'category' => 'Type Boosters',
                'effect' => '+20% to Ice-type moves.',
                'type_mod' => 1.2, 'boost_type' => 'Ice',
            ],
            [
                'name' => 'Black Belt', 'slug' => 'black-belt', 'category' => 'Type Boosters',
                'effect' => '+20% to Fighting-type moves.',
                'type_mod' => 1.2, 'boost_type' => 'Fighting',
            ],
            [
                'name' => 'Poison Barb', 'slug' => 'poison-barb', 'category' => 'Type Boosters',
                'effect' => '+20% to Poison-type moves.',
                'type_mod' => 1.2, 'boost_type' => 'Poison',
            ],
            [
                'name' => 'Soft Sand', 'slug' => 'soft-sand', 'category' => 'Type Boosters',
                'effect' => '+20% to Ground-type moves.',
                'type_mod' => 1.2, 'boost_type' => 'Ground',
            ],
            [
                'name' => 'Sharp Beak', 'slug' => 'sharp-beak', 'category' => 'Type Boosters',
                'effect' => '+20% to Flying-type moves.',
                'type_mod' => 1.2, 'boost_type' => 'Flying',
            ],
            [
                'name' => 'Twisted Spoon', 'slug' => 'twisted-spoon', 'category' => 'Type Boosters',
                'effect' => '+20% to Psychic-type moves.',
                'type_mod' => 1.2, 'boost_type' => 'Psychic',
            ],
            [
                'name' => 'Silver Powder', 'slug' => 'silver-powder', 'category' => 'Type Boosters',
                'effect' => '+20% to Bug-type moves.',
                'type_mod' => 1.2, 'boost_type' => 'Bug',
            ],
            [
                'name' => 'Hard Stone', 'slug' => 'hard-stone', 'category' => 'Type Boosters',
                'effect' => '+20% to Rock-type moves.',
                'type_mod' => 1.2, 'boost_type' => 'Rock',
            ],
            [
                'name' => 'Spell Tag', 'slug' => 'spell-tag', 'category' => 'Type Boosters',
                'effect' => '+20% to Ghost-type moves.',
                'type_mod' => 1.2, 'boost_type' => 'Ghost',
            ],
            [
                'name' => 'Dragon Fang', 'slug' => 'dragon-fang', 'category' => 'Type Boosters',
                'effect' => '+20% to Dragon-type moves.',
                'type_mod' => 1.2, 'boost_type' => 'Dragon',
            ],
            [
                'name' => 'Black Glasses', 'slug' => 'black-glasses', 'category' => 'Type Boosters',
                'effect' => '+20% to Dark-type moves.',
                'type_mod' => 1.2, 'boost_type' => 'Dark',
            ],
            [
                'name' => 'Metal Coat', 'slug' => 'metal-coat', 'category' => 'Type Boosters',
                'effect' => '+20% to Steel-type moves.',
                'type_mod' => 1.2, 'boost_type' => 'Steel',
            ],
            [
                'name' => 'Pixie Plate', 'slug' => 'pixie-plate', 'category' => 'Type Boosters',
                'effect' => '+20% to Fairy-type moves. Changes Arceus type to Fairy.',
                'type_mod' => 1.2, 'boost_type' => 'Fairy',
            ],

            // ── Arceus Plates (same 1.2× as type boosters) ───────────────────────
            [
                'name' => 'Flame Plate',   'slug' => 'flame-plate',   'category' => 'Plates',
                'effect' => '+20% to Fire-type moves. Changes Arceus type to Fire.',
                'type_mod' => 1.2, 'boost_type' => 'Fire',
            ],
            [
                'name' => 'Splash Plate',  'slug' => 'splash-plate',  'category' => 'Plates',
                'effect' => '+20% to Water-type moves. Changes Arceus type to Water.',
                'type_mod' => 1.2, 'boost_type' => 'Water',
            ],
            [
                'name' => 'Zap Plate',     'slug' => 'zap-plate',     'category' => 'Plates',
                'effect' => '+20% to Electric-type moves. Changes Arceus type to Electric.',
                'type_mod' => 1.2, 'boost_type' => 'Electric',
            ],
            [
                'name' => 'Meadow Plate',  'slug' => 'meadow-plate',  'category' => 'Plates',
                'effect' => '+20% to Grass-type moves. Changes Arceus type to Grass.',
                'type_mod' => 1.2, 'boost_type' => 'Grass',
            ],
            [
                'name' => 'Icicle Plate',  'slug' => 'icicle-plate',  'category' => 'Plates',
                'effect' => '+20% to Ice-type moves. Changes Arceus type to Ice.',
                'type_mod' => 1.2, 'boost_type' => 'Ice',
            ],
            [
                'name' => 'Fist Plate',    'slug' => 'fist-plate',    'category' => 'Plates',
                'effect' => '+20% to Fighting-type moves. Changes Arceus type to Fighting.',
                'type_mod' => 1.2, 'boost_type' => 'Fighting',
            ],
            [
                'name' => 'Toxic Plate',   'slug' => 'toxic-plate',   'category' => 'Plates',
                'effect' => '+20% to Poison-type moves. Changes Arceus type to Poison.',
                'type_mod' => 1.2, 'boost_type' => 'Poison',
            ],
            [
                'name' => 'Earth Plate',   'slug' => 'earth-plate',   'category' => 'Plates',
                'effect' => '+20% to Ground-type moves. Changes Arceus type to Ground.',
                'type_mod' => 1.2, 'boost_type' => 'Ground',
            ],
            [
                'name' => 'Sky Plate',     'slug' => 'sky-plate',     'category' => 'Plates',
                'effect' => '+20% to Flying-type moves. Changes Arceus type to Flying.',
                'type_mod' => 1.2, 'boost_type' => 'Flying',
            ],
            [
                'name' => 'Mind Plate',    'slug' => 'mind-plate',    'category' => 'Plates',
                'effect' => '+20% to Psychic-type moves. Changes Arceus type to Psychic.',
                'type_mod' => 1.2, 'boost_type' => 'Psychic',
            ],
            [
                'name' => 'Insect Plate',  'slug' => 'insect-plate',  'category' => 'Plates',
                'effect' => '+20% to Bug-type moves. Changes Arceus type to Bug.',
                'type_mod' => 1.2, 'boost_type' => 'Bug',
            ],
            [
                'name' => 'Stone Plate',   'slug' => 'stone-plate',   'category' => 'Plates',
                'effect' => '+20% to Rock-type moves. Changes Arceus type to Rock.',
                'type_mod' => 1.2, 'boost_type' => 'Rock',
            ],
            [
                'name' => 'Spooky Plate',  'slug' => 'spooky-plate',  'category' => 'Plates',
                'effect' => '+20% to Ghost-type moves. Changes Arceus type to Ghost.',
                'type_mod' => 1.2, 'boost_type' => 'Ghost',
            ],
            [
                'name' => 'Draco Plate',   'slug' => 'draco-plate',   'category' => 'Plates',
                'effect' => '+20% to Dragon-type moves. Changes Arceus type to Dragon.',
                'type_mod' => 1.2, 'boost_type' => 'Dragon',
            ],
            [
                'name' => 'Dread Plate',   'slug' => 'dread-plate',   'category' => 'Plates',
                'effect' => '+20% to Dark-type moves. Changes Arceus type to Dark.',
                'type_mod' => 1.2, 'boost_type' => 'Dark',
            ],
            [
                'name' => 'Iron Plate',    'slug' => 'iron-plate',    'category' => 'Plates',
                'effect' => '+20% to Steel-type moves. Changes Arceus type to Steel.',
                'type_mod' => 1.2, 'boost_type' => 'Steel',
            ],
        ];

        $defaults = [
            'stat_atk_mod' => 1.0, 'stat_spa_mod' => 1.0,
            'stat_def_mod' => 1.0, 'stat_spd_mod' => 1.0, 'stat_spe_mod' => 1.0,
            'damage_mod' => 1.0, 'phys_damage_mod' => 1.0, 'spec_damage_mod' => 1.0,
            'type_mod' => 1.0, 'boost_type' => null, 'super_effective_mod' => 1.0,
            'created_at' => now(), 'updated_at' => now(),
        ];

        $rows = array_map(fn($item) => array_merge($defaults, $item), $items);

        DB::table('items')->insert($rows);
    }
}
