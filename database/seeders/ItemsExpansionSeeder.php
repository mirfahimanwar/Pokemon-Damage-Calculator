<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemsExpansionSeeder extends Seeder
{
    public function run(): void
    {
        // ────────────────────────────────────────────────────────
        // 1. Mark existing items that are Champions-eligible
        //    Source: game8.co/games/Pokemon-Champions/archives/588871
        // ────────────────────────────────────────────────────────
        $championsExisting = [
            // 17 type boosters already in DB
            'Silk Scarf', 'Miracle Seed', 'Charcoal', 'Mystic Water', 'Magnet',
            'Silver Powder', 'Sharp Beak', 'Hard Stone', 'Poison Barb', 'Soft Sand',
            'Never-Melt Ice', 'Black Belt', 'Twisted Spoon', 'Spell Tag',
            'Dragon Fang', 'Black Glasses', 'Metal Coat',
            // Stat Boost items already in DB
            'Choice Scarf', 'Focus Sash',
            // Recovery items already in DB
            'Leftovers',
        ];
        DB::table('items')->whereIn('name', $championsExisting)->update(['is_champions' => true]);

        // ────────────────────────────────────────────────────────
        // 2. Helper
        // ────────────────────────────────────────────────────────
        $now = now();
        $base = [
            'stat_atk_mod' => 1, 'stat_spa_mod' => 1,
            'stat_def_mod' => 1, 'stat_spd_mod' => 1, 'stat_spe_mod' => 1,
            'damage_mod' => 1, 'phys_damage_mod' => 1, 'spec_damage_mod' => 1,
            'type_mod' => 1, 'boost_type' => null, 'super_effective_mod' => 1,
            'is_champions' => false,
            'created_at' => $now, 'updated_at' => $now,
        ];
        $insert = function (array $items) use ($base) {
            foreach ($items as $item) {
                DB::table('items')->insertOrIgnore(array_merge($base, $item));
            }
        };

        // ────────────────────────────────────────────────────────
        // 3. New TYPE BOOSTERS
        // ────────────────────────────────────────────────────────
        $insert([
            // Fairy — the only type booster we were missing
            ['name' => 'Fairy Feather', 'slug' => 'fairy-feather',
             'category' => 'Type Boosters',
             'effect' => 'Boosts the power of Fairy-type moves by 20%.',
             'boost_type' => 'Fairy', 'type_mod' => 1.2, 'is_champions' => true],

            // Incenses (alternate type boosters, not Champions)
            ['name' => 'Sea Incense',  'slug' => 'sea-incense',
             'category' => 'Type Boosters',
             'effect' => 'Boosts the power of Water-type moves by 20%.',
             'boost_type' => 'Water', 'type_mod' => 1.2],
            ['name' => 'Wave Incense', 'slug' => 'wave-incense',
             'category' => 'Type Boosters',
             'effect' => 'Boosts the power of Water-type moves by 20%.',
             'boost_type' => 'Water', 'type_mod' => 1.2],
            ['name' => 'Odd Incense',  'slug' => 'odd-incense',
             'category' => 'Type Boosters',
             'effect' => 'Boosts the power of Psychic-type moves by 20%.',
             'boost_type' => 'Psychic', 'type_mod' => 1.2],
            ['name' => 'Rock Incense', 'slug' => 'rock-incense',
             'category' => 'Type Boosters',
             'effect' => 'Boosts the power of Rock-type moves by 20%.',
             'boost_type' => 'Rock', 'type_mod' => 1.2],
            ['name' => 'Rose Incense', 'slug' => 'rose-incense',
             'category' => 'Type Boosters',
             'effect' => 'Boosts the power of Grass-type moves by 20%.',
             'boost_type' => 'Grass', 'type_mod' => 1.2],
        ]);

        // ────────────────────────────────────────────────────────
        // 4. DAMAGE BOOSTERS (non-type)
        // ────────────────────────────────────────────────────────
        $insert([
            ['name' => 'Loaded Dice', 'slug' => 'loaded-dice',
             'category' => 'Damage Boosters',
             'effect' => 'Makes multi-strike moves more likely to hit the maximum number of times.'],
            ['name' => 'Metronome', 'slug' => 'metronome',
             'category' => 'Damage Boosters',
             'effect' => 'Increases the power of a move used consecutively.'],
        ]);

        // ────────────────────────────────────────────────────────
        // 5. STATUS ORBS
        // ────────────────────────────────────────────────────────
        $insert([
            ['name' => 'Flame Orb', 'slug' => 'flame-orb',
             'category' => 'Status Orbs',
             'effect' => 'Inflicts the holder with a burn, halving its physical Attack.',
             // Burn halves physical attack — model as stat_atk_mod 0.5
             'stat_atk_mod' => 0.5],
            ['name' => 'Toxic Orb', 'slug' => 'toxic-orb',
             'category' => 'Status Orbs',
             'effect' => 'Badly poisons the holder each turn.'],
        ]);

        // ────────────────────────────────────────────────────────
        // 6. DEFENSIVE / UTILITY (not already in DB)
        // ────────────────────────────────────────────────────────
        $insert([
            ['name' => 'Air Balloon', 'slug' => 'air-balloon',
             'category' => 'Defensive',
             'effect' => 'Holder floats; immune to Ground moves until hit.'],
            ['name' => 'Safety Goggles', 'slug' => 'safety-goggles',
             'category' => 'Defensive',
             'effect' => 'Protects the holder from weather damage and powder moves.'],
            ['name' => 'Covert Cloak', 'slug' => 'covert-cloak',
             'category' => 'Defensive',
             'effect' => 'Protects the holder from the added effects of moves used against it.'],
            ['name' => 'Focus Band', 'slug' => 'focus-band',
             'category' => 'Defensive',
             'effect' => 'May endure a lethal hit, leaving 1 HP (random chance).',
             'is_champions' => true],
            ['name' => 'Ability Shield', 'slug' => 'ability-shield',
             'category' => 'Defensive',
             'effect' => 'Protects the holder from having its Ability changed.'],
            ['name' => 'Clear Amulet', 'slug' => 'clear-amulet',
             'category' => 'Defensive',
             'effect' => 'Protects the holder from having its stats lowered by opponents.'],
            ['name' => 'Protective Pads', 'slug' => 'protective-pads',
             'category' => 'Defensive',
             'effect' => 'Protects the holder from effects caused by making direct contact.'],
            ['name' => 'Ring Target', 'slug' => 'ring-target',
             'category' => 'Defensive',
             'effect' => 'Moves that would have no effect will hit the holder.'],
        ]);

        // ────────────────────────────────────────────────────────
        // 7. RECOVERY
        // ────────────────────────────────────────────────────────
        $insert([
            ['name' => 'Shell Bell', 'slug' => 'shell-bell',
             'category' => 'Recovery',
             'effect' => 'Restores 1/8 of the damage dealt to the holder.',
             'is_champions' => true],
            ['name' => 'Black Sludge', 'slug' => 'black-sludge',
             'category' => 'Recovery',
             'effect' => 'Gradually restores HP of Poison types; damages all others.'],
            ['name' => 'Big Root', 'slug' => 'big-root',
             'category' => 'Recovery',
             'effect' => 'Boosts the amount of HP restored by draining moves by 30%.'],
        ]);

        // ────────────────────────────────────────────────────────
        // 8. CRITICAL HIT
        // ────────────────────────────────────────────────────────
        $insert([
            ['name' => 'Scope Lens', 'slug' => 'scope-lens',
             'category' => 'Critical Hit',
             'effect' => 'Raises the holder\'s critical-hit ratio by one stage.',
             'is_champions' => true],
            ['name' => 'Razor Claw', 'slug' => 'razor-claw',
             'category' => 'Critical Hit',
             'effect' => 'Raises the holder\'s critical-hit ratio by one stage.'],
        ]);

        // ────────────────────────────────────────────────────────
        // 9. ACCURACY / SPEED
        // ────────────────────────────────────────────────────────
        $insert([
            ['name' => 'Wide Lens', 'slug' => 'wide-lens',
             'category' => 'Accuracy',
             'effect' => 'Raises the accuracy of the holder\'s moves by 10%.'],
            ['name' => 'Zoom Lens', 'slug' => 'zoom-lens',
             'category' => 'Accuracy',
             'effect' => 'Raises the accuracy of the holder\'s moves by 20% if it moves after its target.'],
            ['name' => 'Bright Powder', 'slug' => 'bright-powder',
             'category' => 'Accuracy',
             'effect' => 'Lowers the accuracy of moves used against the holder by 10%.',
             'is_champions' => true],
        ]);

        // ────────────────────────────────────────────────────────
        // 10. SPEED / PRIORITY
        // ────────────────────────────────────────────────────────
        $insert([
            ['name' => 'Quick Claw', 'slug' => 'quick-claw',
             'category' => 'Speed',
             'effect' => 'A random chance to move first regardless of Speed.',
             'is_champions' => true],
            ['name' => "King's Rock", 'slug' => 'kings-rock',
             'category' => 'Speed',
             'effect' => "May cause the target to flinch when the holder attacks.",
             'is_champions' => true],
            ['name' => 'Iron Ball', 'slug' => 'iron-ball',
             'category' => 'Speed',
             'effect' => 'Halves the holder\'s Speed and makes it susceptible to Ground moves.'],
            ['name' => 'Lagging Tail', 'slug' => 'lagging-tail',
             'category' => 'Speed',
             'effect' => 'The holder always moves last within its priority bracket.'],
            ['name' => 'Full Incense', 'slug' => 'full-incense',
             'category' => 'Speed',
             'effect' => 'The holder always moves last within its priority bracket.'],
        ]);

        // ────────────────────────────────────────────────────────
        // 11. STAT RESET / HERB
        // ────────────────────────────────────────────────────────
        $insert([
            ['name' => 'White Herb', 'slug' => 'white-herb',
             'category' => 'Stat Items',
             'effect' => 'Restores any lowered stats once, then consumed.',
             'is_champions' => true],
            ['name' => 'Power Herb', 'slug' => 'power-herb',
             'category' => 'Stat Items',
             'effect' => 'Allows the immediate use of a two-turn move, then consumed.'],
            ['name' => 'Mental Herb', 'slug' => 'mental-herb',
             'category' => 'Stat Items',
             'effect' => 'Cures infatuation, taunt, encore, torment, heal block and disable.',
             'is_champions' => true],
        ]);

        // ────────────────────────────────────────────────────────
        // 12. REACTIVE ITEMS
        // ────────────────────────────────────────────────────────
        $insert([
            ['name' => 'Weakness Policy', 'slug' => 'weakness-policy',
             'category' => 'Reactive',
             'effect' => 'Sharply raises Attack and Sp. Atk when hit by a super-effective move.'],
            ['name' => 'Absorb Bulb',  'slug' => 'absorb-bulb',
             'category' => 'Reactive',
             'effect' => 'Raises Sp. Atk when hit by a Water-type move, then consumed.'],
            ['name' => 'Cell Battery', 'slug' => 'cell-battery',
             'category' => 'Reactive',
             'effect' => 'Raises Attack when hit by an Electric-type move, then consumed.'],
            ['name' => 'Luminous Moss', 'slug' => 'luminous-moss',
             'category' => 'Reactive',
             'effect' => 'Raises Sp. Def when hit by a Water-type move.'],
            ['name' => 'Snowball', 'slug' => 'snowball',
             'category' => 'Reactive',
             'effect' => 'Raises Attack when hit by an Ice-type move.'],
            ['name' => 'Throat Spray', 'slug' => 'throat-spray',
             'category' => 'Reactive',
             'effect' => 'Raises Sp. Atk after using a sound-based move.'],
            ['name' => 'Mirror Herb', 'slug' => 'mirror-herb',
             'category' => 'Reactive',
             'effect' => 'Copies an opponent\'s stat increases once.'],
            ['name' => 'Adrenaline Orb', 'slug' => 'adrenaline-orb',
             'category' => 'Reactive',
             'effect' => 'Boosts Speed when the holder is Intimidated.'],
        ]);

        // ────────────────────────────────────────────────────────
        // 13. SWITCH ITEMS
        // ────────────────────────────────────────────────────────
        $insert([
            ['name' => 'Eject Button', 'slug' => 'eject-button',
             'category' => 'Switch Items',
             'effect' => 'Switches the holder out when it is hit by an attack.'],
            ['name' => 'Eject Pack', 'slug' => 'eject-pack',
             'category' => 'Switch Items',
             'effect' => 'Switches the holder out when its stats are lowered.'],
            ['name' => 'Red Card', 'slug' => 'red-card',
             'category' => 'Switch Items',
             'effect' => 'Forces the attacker to switch out when the holder is struck.'],
            ['name' => 'Shed Shell', 'slug' => 'shed-shell',
             'category' => 'Switch Items',
             'effect' => 'Allows the holder to always switch out or flee.'],
        ]);

        // ────────────────────────────────────────────────────────
        // 14. TERRAIN / WEATHER
        // ────────────────────────────────────────────────────────
        $insert([
            ['name' => 'Electric Seed', 'slug' => 'electric-seed',
             'category' => 'Terrain Seeds',
             'effect' => 'Boosts Defense on Electric Terrain.'],
            ['name' => 'Grassy Seed', 'slug' => 'grassy-seed',
             'category' => 'Terrain Seeds',
             'effect' => 'Boosts Defense on Grassy Terrain.'],
            ['name' => 'Misty Seed', 'slug' => 'misty-seed',
             'category' => 'Terrain Seeds',
             'effect' => 'Boosts Sp. Def on Misty Terrain.'],
            ['name' => 'Psychic Seed', 'slug' => 'psychic-seed',
             'category' => 'Terrain Seeds',
             'effect' => 'Boosts Sp. Def on Psychic Terrain.'],
            ['name' => 'Light Clay', 'slug' => 'light-clay',
             'category' => 'Terrain Seeds',
             'effect' => 'Extends Light Screen and Reflect to 8 turns.'],
            ['name' => 'Damp Rock', 'slug' => 'damp-rock',
             'category' => 'Terrain Seeds',
             'effect' => 'Extends Rain Dance to 8 turns.'],
            ['name' => 'Heat Rock', 'slug' => 'heat-rock',
             'category' => 'Terrain Seeds',
             'effect' => 'Extends Sunny Day to 8 turns.'],
            ['name' => 'Icy Rock', 'slug' => 'icy-rock',
             'category' => 'Terrain Seeds',
             'effect' => 'Extends Hail/Snow to 8 turns.'],
            ['name' => 'Smooth Rock', 'slug' => 'smooth-rock',
             'category' => 'Terrain Seeds',
             'effect' => 'Extends Sandstorm to 8 turns.'],
            ['name' => 'Terrain Extender', 'slug' => 'terrain-extender',
             'category' => 'Terrain Seeds',
             'effect' => 'Extends the duration of terrain moves.'],
        ]);

        // ────────────────────────────────────────────────────────
        // 15. SPECIES-SPECIFIC ITEMS
        // ────────────────────────────────────────────────────────
        $insert([
            ['name' => 'Light Ball', 'slug' => 'light-ball',
             'category' => 'Species Items',
             'effect' => 'Doubles Attack and Sp. Atk when held by Pikachu.',
             'stat_atk_mod' => 2.0, 'stat_spa_mod' => 2.0,
             'is_champions' => true],
            ['name' => 'Thick Club', 'slug' => 'thick-club',
             'category' => 'Species Items',
             'effect' => 'Doubles Attack when held by Cubone or Marowak.',
             'stat_atk_mod' => 2.0],
            ['name' => 'Deep Sea Tooth', 'slug' => 'deep-sea-tooth',
             'category' => 'Species Items',
             'effect' => 'Doubles Sp. Atk when held by Clamperl.',
             'stat_spa_mod' => 2.0],
            ['name' => 'Deep Sea Scale', 'slug' => 'deep-sea-scale',
             'category' => 'Species Items',
             'effect' => 'Doubles Sp. Def when held by Clamperl.',
             'stat_spd_mod' => 2.0],
            ['name' => 'Leek',         'slug' => 'leek',
             'category' => 'Species Items',
             'effect' => 'Greatly raises the critical-hit ratio of Farfetch\'d and Sirfetch\'d.'],
            ['name' => 'Lucky Punch',  'slug' => 'lucky-punch',
             'category' => 'Species Items',
             'effect' => 'Greatly raises the critical-hit ratio of Chansey.'],
            ['name' => 'Metal Powder', 'slug' => 'metal-powder',
             'category' => 'Species Items',
             'effect' => 'Doubles Defense when held by Ditto.',
             'stat_def_mod' => 2.0, 'stat_spd_mod' => 2.0],
            ['name' => 'Quick Powder', 'slug' => 'quick-powder',
             'category' => 'Species Items',
             'effect' => 'Doubles Speed when held by Ditto.'],
            ['name' => 'Soul Dew', 'slug' => 'soul-dew',
             'category' => 'Species Items',
             'effect' => 'Raises Sp. Atk and Sp. Def by 50% for Latios and Latias.',
             'stat_spa_mod' => 1.5, 'stat_spd_mod' => 1.5],
            ['name' => 'Adamant Crystal', 'slug' => 'adamant-crystal',
             'category' => 'Species Items',
             'effect' => 'Boosts Dragon- and Steel-type moves for Dialga. (The Origin Forme version of Adamant Orb)'],
            ['name' => 'Adamant Orb', 'slug' => 'adamant-orb',
             'category' => 'Species Items',
             'effect' => 'Boosts Dragon- and Steel-type moves for Dialga.',
             'type_mod' => 1.2],  // applies to Dragon OR Steel — complex, so 1.2 is a placeholder
            ['name' => 'Lustrous Orb', 'slug' => 'lustrous-orb',
             'category' => 'Species Items',
             'effect' => 'Boosts Dragon- and Water-type moves for Palkia.',
             'type_mod' => 1.2],
            ['name' => 'Griseous Orb', 'slug' => 'griseous-orb',
             'category' => 'Species Items',
             'effect' => 'Boosts Dragon- and Ghost-type moves for Giratina; changes it to Origin Forme.',
             'type_mod' => 1.2],
        ]);

        // ────────────────────────────────────────────────────────
        // 16. STATUS BERRIES (Champions)
        // ────────────────────────────────────────────────────────
        $status_berries = [
            ['name' => 'Cheri Berry',  'slug' => 'cheri-berry',  'effect' => 'Cures paralysis.'],
            ['name' => 'Chesto Berry', 'slug' => 'chesto-berry', 'effect' => 'Cures sleep.'],
            ['name' => 'Pecha Berry',  'slug' => 'pecha-berry',  'effect' => 'Cures poison.'],
            ['name' => 'Rawst Berry',  'slug' => 'rawst-berry',  'effect' => 'Cures a burn.'],
            ['name' => 'Aspear Berry', 'slug' => 'aspear-berry', 'effect' => 'Thaws a frozen Pokémon.'],
            ['name' => 'Persim Berry', 'slug' => 'persim-berry', 'effect' => 'Cures confusion.'],
            ['name' => 'Leppa Berry',  'slug' => 'leppa-berry',  'effect' => 'Restores 10 PP to a depleted move.'],
            ['name' => 'Oran Berry',   'slug' => 'oran-berry',   'effect' => 'Restores 10 HP.'],
        ];
        foreach ($status_berries as $b) {
            $insert([array_merge($b, ['category' => 'Status Berries', 'is_champions' => true])]);
        }
        // Chilan is a Normal type resist berry, listed with status berries in Champions
        $insert([['name' => 'Chilan Berry', 'slug' => 'chilan-berry',
                  'category' => 'Resistance Berries',
                  'effect' => 'Weakens a Normal-type attack against the holder.',
                  'is_champions' => true]]);

        // General berries not in Champions
        $insert([
            ['name' => 'Lum Berry',   'slug' => 'lum-berry',
             'category' => 'Status Berries',
             'effect' => 'Cures any status condition.',
             'is_champions' => true],
            ['name' => 'Sitrus Berry','slug' => 'sitrus-berry',
             'category' => 'Status Berries',
             'effect' => 'Restores 1/4 of maximum HP.',
             'is_champions' => true],
            ['name' => 'Figy Berry',  'slug' => 'figy-berry',
             'category' => 'Status Berries',
             'effect' => 'Restores HP when low; may cause confusion.'],
            ['name' => 'Wiki Berry',  'slug' => 'wiki-berry',
             'category' => 'Status Berries',
             'effect' => 'Restores HP when low; may cause confusion.'],
            ['name' => 'Mago Berry',  'slug' => 'mago-berry',
             'category' => 'Status Berries',
             'effect' => 'Restores HP when low; may cause confusion.'],
            ['name' => 'Aguav Berry', 'slug' => 'aguav-berry',
             'category' => 'Status Berries',
             'effect' => 'Restores HP when low; may cause confusion.'],
            ['name' => 'Iapapa Berry','slug' => 'iapapa-berry',
             'category' => 'Status Berries',
             'effect' => 'Restores HP when low; may cause confusion.'],
            ['name' => 'Custap Berry','slug' => 'custap-berry',
             'category' => 'Status Berries',
             'effect' => 'Moves first when HP is very low.'],
            ['name' => 'Enigma Berry','slug' => 'enigma-berry',
             'category' => 'Status Berries',
             'effect' => 'Restores HP when hit by a super-effective move.'],
        ]);

        // ────────────────────────────────────────────────────────
        // 17. RESISTANCE BERRIES (halve SE damage for a type)
        // Champions ones marked accordingly
        // ────────────────────────────────────────────────────────
        $resist_berries = [
            ['slug' => 'occa-berry',   'name' => 'Occa Berry',   'effect' => 'Weakens a super-effective Fire-type attack.',    'is_champions' => true],
            ['slug' => 'passho-berry', 'name' => 'Passho Berry', 'effect' => 'Weakens a super-effective Water-type attack.',   'is_champions' => true],
            ['slug' => 'wacan-berry',  'name' => 'Wacan Berry',  'effect' => 'Weakens a super-effective Electric-type attack.','is_champions' => true],
            ['slug' => 'rindo-berry',  'name' => 'Rindo Berry',  'effect' => 'Weakens a super-effective Grass-type attack.',   'is_champions' => true],
            ['slug' => 'yache-berry',  'name' => 'Yache Berry',  'effect' => 'Weakens a super-effective Ice-type attack.',     'is_champions' => true],
            ['slug' => 'chople-berry', 'name' => 'Chople Berry', 'effect' => 'Weakens a super-effective Fighting-type attack.','is_champions' => true],
            ['slug' => 'kebia-berry',  'name' => 'Kebia Berry',  'effect' => 'Weakens a super-effective Poison-type attack.',  'is_champions' => true],
            ['slug' => 'shuca-berry',  'name' => 'Shuca Berry',  'effect' => 'Weakens a super-effective Ground-type attack.',  'is_champions' => true],
            ['slug' => 'coba-berry',   'name' => 'Coba Berry',   'effect' => 'Weakens a super-effective Flying-type attack.',  'is_champions' => true],
            ['slug' => 'payapa-berry', 'name' => 'Payapa Berry', 'effect' => 'Weakens a super-effective Psychic-type attack.', 'is_champions' => true],
            ['slug' => 'tanga-berry',  'name' => 'Tanga Berry',  'effect' => 'Weakens a super-effective Bug-type attack.',     'is_champions' => true],
            ['slug' => 'charti-berry', 'name' => 'Charti Berry', 'effect' => 'Weakens a super-effective Rock-type attack.',    'is_champions' => true],
            ['slug' => 'kasib-berry',  'name' => 'Kasib Berry',  'effect' => 'Weakens a super-effective Ghost-type attack.',   'is_champions' => true],
            ['slug' => 'haban-berry',  'name' => 'Haban Berry',  'effect' => 'Weakens a super-effective Dragon-type attack.',  'is_champions' => true],
            ['slug' => 'colbur-berry', 'name' => 'Colbur Berry', 'effect' => 'Weakens a super-effective Dark-type attack.',    'is_champions' => true],
            ['slug' => 'babiri-berry', 'name' => 'Babiri Berry', 'effect' => 'Weakens a super-effective Steel-type attack.',   'is_champions' => true],
            ['slug' => 'roseli-berry', 'name' => 'Roseli Berry', 'effect' => 'Weakens a super-effective Fairy-type attack.',   'is_champions' => true],
            // Not in Champions but useful
            ['slug' => 'micle-berry',  'name' => 'Micle Berry',  'effect' => 'Raises accuracy of one move when HP is very low.', 'is_champions' => false],
        ];
        foreach ($resist_berries as $b) {
            $insert([array_merge($b, ['category' => 'Resistance Berries'])]);
        }

        // ────────────────────────────────────────────────────────
        // 18. STAT BERRIES (raise a stat at low HP)
        // ────────────────────────────────────────────────────────
        $stat_berries = [
            ['slug' => 'liechi-berry',  'name' => 'Liechi Berry',  'effect' => 'Raises Attack when HP is very low.',         'stat_atk_mod' => 1.5],
            ['slug' => 'ganlon-berry',  'name' => 'Ganlon Berry',  'effect' => 'Raises Defense when HP is very low.',        'stat_def_mod' => 1.5],
            ['slug' => 'salac-berry',   'name' => 'Salac Berry',   'effect' => 'Raises Speed when HP is very low.',          'stat_spe_mod' => 1.5],
            ['slug' => 'petaya-berry',  'name' => 'Petaya Berry',  'effect' => 'Raises Sp. Atk when HP is very low.',        'stat_spa_mod' => 1.5],
            ['slug' => 'apicot-berry',  'name' => 'Apicot Berry',  'effect' => 'Raises Sp. Def when HP is very low.',        'stat_spd_mod' => 1.5],
            ['slug' => 'lansat-berry',  'name' => 'Lansat Berry',  'effect' => 'Raises critical-hit ratio when HP is very low.'],
            ['slug' => 'starf-berry',   'name' => 'Starf Berry',   'effect' => 'Sharply raises a random stat when HP is very low.'],
            ['slug' => 'kee-berry',     'name' => 'Kee Berry',     'effect' => 'Raises Defense when hit by a physical move.', 'stat_def_mod' => 1.5],
            ['slug' => 'maranga-berry', 'name' => 'Maranga Berry', 'effect' => 'Raises Sp. Def when hit by a special move.', 'stat_spd_mod' => 1.5],
        ];
        foreach ($stat_berries as $b) {
            $insert([array_merge($b, ['category' => 'Stat Berries'])]);
        }
    }
}
