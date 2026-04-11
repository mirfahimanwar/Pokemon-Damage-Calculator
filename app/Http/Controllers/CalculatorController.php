<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CalculatorController extends Controller
{
    // Gen IX type effectiveness chart
    private const TYPE_CHART = [
        'Normal'   => ['Ghost' => 0, 'Rock' => 0.5, 'Steel' => 0.5],
        'Fire'     => ['Fire' => 0.5, 'Water' => 0.5, 'Grass' => 2, 'Ice' => 2, 'Bug' => 2, 'Rock' => 0.5, 'Dragon' => 0.5, 'Steel' => 2],
        'Water'    => ['Fire' => 2, 'Water' => 0.5, 'Grass' => 0.5, 'Ground' => 2, 'Rock' => 2, 'Dragon' => 0.5],
        'Electric' => ['Water' => 2, 'Electric' => 0.5, 'Grass' => 0.5, 'Ground' => 0, 'Flying' => 2, 'Dragon' => 0.5],
        'Grass'    => ['Fire' => 0.5, 'Water' => 2, 'Grass' => 0.5, 'Poison' => 0.5, 'Ground' => 2, 'Flying' => 0.5, 'Bug' => 0.5, 'Rock' => 2, 'Dragon' => 0.5, 'Steel' => 0.5],
        'Ice'      => ['Water' => 0.5, 'Grass' => 2, 'Ice' => 0.5, 'Ground' => 2, 'Flying' => 2, 'Dragon' => 2, 'Steel' => 0.5],
        'Fighting' => ['Normal' => 2, 'Ice' => 2, 'Poison' => 0.5, 'Flying' => 0.5, 'Psychic' => 0.5, 'Bug' => 0.5, 'Rock' => 2, 'Ghost' => 0, 'Dark' => 2, 'Steel' => 2, 'Fairy' => 0.5],
        'Poison'   => ['Grass' => 2, 'Poison' => 0.5, 'Ground' => 0.5, 'Rock' => 0.5, 'Ghost' => 0.5, 'Steel' => 0, 'Fairy' => 2],
        'Ground'   => ['Fire' => 2, 'Electric' => 2, 'Grass' => 0.5, 'Poison' => 2, 'Flying' => 0, 'Bug' => 0.5, 'Rock' => 2, 'Steel' => 2],
        'Flying'   => ['Electric' => 0.5, 'Grass' => 2, 'Fighting' => 2, 'Bug' => 2, 'Rock' => 0.5, 'Steel' => 0.5],
        'Psychic'  => ['Fighting' => 2, 'Poison' => 2, 'Psychic' => 0.5, 'Dark' => 0, 'Steel' => 0.5],
        'Bug'      => ['Fire' => 0.5, 'Grass' => 2, 'Fighting' => 0.5, 'Flying' => 0.5, 'Psychic' => 2, 'Ghost' => 0.5, 'Dark' => 2, 'Steel' => 0.5, 'Fairy' => 0.5],
        'Rock'     => ['Fire' => 2, 'Ice' => 2, 'Fighting' => 0.5, 'Ground' => 0.5, 'Flying' => 2, 'Bug' => 2, 'Steel' => 0.5],
        'Ghost'    => ['Normal' => 0, 'Psychic' => 2, 'Ghost' => 2, 'Dark' => 0.5],
        'Dragon'   => ['Dragon' => 2, 'Steel' => 0.5, 'Fairy' => 0],
        'Dark'     => ['Fighting' => 0.5, 'Psychic' => 2, 'Ghost' => 2, 'Dark' => 0.5, 'Fairy' => 0.5],
        'Steel'    => ['Fire' => 0.5, 'Water' => 0.5, 'Electric' => 0.5, 'Ice' => 2, 'Rock' => 2, 'Steel' => 0.5, 'Fairy' => 2],
        'Fairy'    => ['Fire' => 0.5, 'Fighting' => 2, 'Poison' => 0.5, 'Dragon' => 2, 'Dark' => 2, 'Steel' => 0.5],
    ];

    public function calculate(Request $request)
    {
        $data = $request->validate([
            'attacker'           => 'required|array',
            'attacker.level'     => 'required|integer|between:1,100',
            'attacker.hp'        => 'required|integer|min:1',
            'attacker.attack'    => 'required|integer|min:1',
            'attacker.defense'   => 'required|integer|min:1',
            'attacker.special_attack'  => 'required|integer|min:1',
            'attacker.special_defense' => 'required|integer|min:1',
            'attacker.speed'     => 'required|integer|min:1',
            'attacker.type1'     => 'required|string',
            'attacker.type2'     => 'nullable|string',
            'attacker.hp_iv'     => 'integer|between:0,31',
            'attacker.hp_ev'     => 'integer|between:0,252',
            'attacker.atk_iv'    => 'integer|between:0,31',
            'attacker.atk_ev'    => 'integer|between:0,252',
            'attacker.def_iv'    => 'integer|between:0,31',
            'attacker.def_ev'    => 'integer|between:0,252',
            'attacker.spa_iv'    => 'integer|between:0,31',
            'attacker.spa_ev'    => 'integer|between:0,252',
            'attacker.spd_iv'    => 'integer|between:0,31',
            'attacker.spd_ev'    => 'integer|between:0,252',
            'attacker.spe_iv'    => 'integer|between:0,31',
            'attacker.spe_ev'    => 'integer|between:0,252',
            'attacker.nature'    => 'nullable|string',
            'defender'           => 'required|array',
            'defender.level'     => 'required|integer|between:1,100',
            'defender.hp'        => 'required|integer|min:1',
            'defender.attack'    => 'required|integer|min:1',
            'defender.defense'   => 'required|integer|min:1',
            'defender.special_attack'  => 'required|integer|min:1',
            'defender.special_defense' => 'required|integer|min:1',
            'defender.speed'     => 'required|integer|min:1',
            'defender.type1'     => 'required|string',
            'defender.type2'     => 'nullable|string',
            'defender.hp_iv'     => 'integer|between:0,31',
            'defender.hp_ev'     => 'integer|between:0,252',
            'defender.def_iv'    => 'integer|between:0,31',
            'defender.def_ev'    => 'integer|between:0,252',
            'defender.spd_iv'    => 'integer|between:0,31',
            'defender.spd_ev'    => 'integer|between:0,252',
            'defender.nature'    => 'nullable|string',
            'move'               => 'required|array',
            'move.power'         => 'required|integer|min:1',
            'move.type'          => 'required|string',
            'move.category'      => 'required|in:Physical,Special',
            'conditions'         => 'nullable|array',
        ]);

        $attacker   = $data['attacker'];
        $defender   = $data['defender'];
        $move       = $data['move'];
        $conditions = $data['conditions'] ?? [];

        // Calculate effective stats
        $atkLevel = $attacker['level'];
        $defLevel = $defender['level'];
        $nature   = $conditions['attacker_nature'] ?? 'Hardy';

        $atkStat = $move['category'] === 'Physical'
            ? $this->calcStat($attacker['attack'],  $attacker['atk_iv'] ?? 31, $attacker['atk_ev'] ?? 0, $atkLevel, $this->natureMod($nature, 'atk'))
            : $this->calcStat($attacker['special_attack'], $attacker['spa_iv'] ?? 31, $attacker['spa_ev'] ?? 0, $atkLevel, $this->natureMod($nature, 'spa'));

        $defNature = $conditions['defender_nature'] ?? 'Hardy';
        $defStat = $move['category'] === 'Physical'
            ? $this->calcStat($defender['defense'],       $defender['def_iv'] ?? 31, $defender['def_ev'] ?? 0, $defLevel, $this->natureMod($defNature, 'def'))
            : $this->calcStat($defender['special_defense'], $defender['spd_iv'] ?? 31, $defender['spd_ev'] ?? 0, $defLevel, $this->natureMod($defNature, 'spd'));

        $defHp = $this->calcHp($defender['hp'], $defender['hp_iv'] ?? 31, $defender['hp_ev'] ?? 0, $defLevel);

        // Gen IX damage formula core
        $baseDamage = intval((intval((2 * $atkLevel / 5) + 2) * $move['power'] * $atkStat / $defStat) / 50) + 2;

        // Modifiers
        $targets     = ($conditions['multi_target'] ?? false) ? 0.75 : 1;
        $weather     = $this->weatherMod($move['type'], $conditions['weather'] ?? 'none');
        $glaiveRush  = ($conditions['glaive_rush'] ?? false) ? 2 : 1;
        $critical    = ($conditions['critical'] ?? false) ? 1.5 : 1;
        $stab        = $this->stabMod($move['type'], $attacker['type1'], $attacker['type2'] ?? null, $conditions['adaptability'] ?? false);
        $type        = $this->typeEffectiveness($move['type'], $defender['type1'], $defender['type2'] ?? null);
        $burn        = ($conditions['burn'] ?? false) && $move['category'] === 'Physical' ? 0.5 : 1;
        $terrain     = $this->terrainMod($move['type'], $conditions['terrain'] ?? 'none', $conditions['attacker_grounded'] ?? true);
        $other       = ($conditions['other_modifier'] ?? 1.0);

        // Random damage rolls (85/100 to 100/100)
        $results = [];
        for ($roll = 85; $roll <= 100; $roll++) {
            $random = $roll / 100;
            $damage = $baseDamage * $targets * $weather * $glaiveRush * $critical * $random;
            $damage = intval($damage); // round down after critical
            $damage = intval($damage * $stab);   // floor stab
            $damage = intval($damage * $type);   // rounds to integer via type chart
            $damage = intval($damage * $burn);
            $damage = intval($damage * $terrain);
            $damage = intval($damage * $other);
            $results[] = max(1, $damage);
        }

        $minDamage = min($results);
        $maxDamage = max($results);

        return response()->json([
            'min_damage'    => $minDamage,
            'max_damage'    => $maxDamage,
            'rolls'         => $results,
            'defender_hp'   => $defHp,
            'attacker_stat' => $atkStat,
            'defender_stat' => $defStat,
            'type_effectiveness' => $type,
            'stab'          => $stab,
            'min_percent'   => round($minDamage / $defHp * 100, 1),
            'max_percent'   => round($maxDamage / $defHp * 100, 1),
            'guaranteed_ko' => $minDamage >= $defHp,
            'possible_ko'   => $maxDamage >= $defHp,
        ]);
    }

    private function calcHp(int $base, int $iv, int $ev, int $level): int
    {
        // Shedinja always has 1 HP
        if ($base === 1) return 1;
        return intval((2 * $base + $iv + intval($ev / 4)) * $level / 100) + $level + 10;
    }

    private function calcStat(int $base, int $iv, int $ev, int $level, float $natureMod): int
    {
        return intval((intval((2 * $base + $iv + intval($ev / 4)) * $level / 100) + 5) * $natureMod);
    }

    private function natureMod(string $nature, string $stat): float
    {
        $chart = [
            'Lonely'  => ['atk' => 1.1, 'def' => 0.9],
            'Brave'   => ['atk' => 1.1, 'spe' => 0.9],
            'Adamant' => ['atk' => 1.1, 'spa' => 0.9],
            'Naughty' => ['atk' => 1.1, 'spd' => 0.9],
            'Bold'    => ['def' => 1.1, 'atk' => 0.9],
            'Relaxed' => ['def' => 1.1, 'spe' => 0.9],
            'Impish'  => ['def' => 1.1, 'spa' => 0.9],
            'Lax'     => ['def' => 1.1, 'spd' => 0.9],
            'Timid'   => ['spe' => 1.1, 'atk' => 0.9],
            'Jolly'   => ['spe' => 1.1, 'spa' => 0.9],
            'Naive'   => ['spe' => 1.1, 'spd' => 0.9],
            'Hasty'   => ['spe' => 1.1, 'def' => 0.9],
            'Modest'  => ['spa' => 1.1, 'atk' => 0.9],
            'Mild'    => ['spa' => 1.1, 'def' => 0.9],
            'Quiet'   => ['spa' => 1.1, 'spe' => 0.9],
            'Rash'    => ['spa' => 1.1, 'spd' => 0.9],
            'Calm'    => ['spd' => 1.1, 'atk' => 0.9],
            'Gentle'  => ['spd' => 1.1, 'def' => 0.9],
            'Sassy'   => ['spd' => 1.1, 'spe' => 0.9],
            'Careful' => ['spd' => 1.1, 'spa' => 0.9],
        ];
        return $chart[$nature][$stat] ?? 1.0;
    }

    private function stabMod(string $moveType, string $type1, ?string $type2, bool $adaptability): float
    {
        $hasStab = $moveType === $type1 || ($type2 && $moveType === $type2);
        if (!$hasStab) return 1.0;
        return $adaptability ? 2.0 : 1.5;
    }

    private function typeEffectiveness(string $moveType, string $defType1, ?string $defType2): float
    {
        $eff = 1.0;
        $chart = self::TYPE_CHART[$moveType] ?? [];
        $eff *= $chart[$defType1] ?? 1.0;
        if ($defType2) {
            $eff *= $chart[$defType2] ?? 1.0;
        }
        // Round to nearest legal multiplier to avoid float drift
        return round($eff * 8) / 8;
    }

    private function weatherMod(string $moveType, string $weather): float
    {
        return match (true) {
            $weather === 'rain'          && $moveType === 'Water' => 1.5,
            $weather === 'rain'          && $moveType === 'Fire'  => 0.5,
            $weather === 'harshsunlight' && $moveType === 'Fire'  => 1.5,
            $weather === 'harshsunlight' && $moveType === 'Water' => 0.5,
            default => 1.0,
        };
    }

    private function terrainMod(string $moveType, string $terrain, bool $grounded): float
    {
        if (!$grounded) return 1.0;
        return match (true) {
            $terrain === 'electric' && $moveType === 'Electric' => 1.3,
            $terrain === 'grassy'   && $moveType === 'Grass'   => 1.3,
            $terrain === 'psychic'  && $moveType === 'Psychic' => 1.3,
            $terrain === 'misty'    && $moveType === 'Dragon'  => 0.5,
            default => 1.0,
        };
    }
}
