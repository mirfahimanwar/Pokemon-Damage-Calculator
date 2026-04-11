// Pokémon type colours and utilities
export const TYPE_COLORS = {
    Normal:   { bg: '#A8A878', text: '#fff' },
    Fire:     { bg: '#F08030', text: '#fff' },
    Water:    { bg: '#6890F0', text: '#fff' },
    Electric: { bg: '#F8D030', text: '#333' },
    Grass:    { bg: '#78C850', text: '#fff' },
    Ice:      { bg: '#98D8D8', text: '#333' },
    Fighting: { bg: '#C03028', text: '#fff' },
    Poison:   { bg: '#A040A0', text: '#fff' },
    Ground:   { bg: '#E0C068', text: '#333' },
    Flying:   { bg: '#A890F0', text: '#fff' },
    Psychic:  { bg: '#F85888', text: '#fff' },
    Bug:      { bg: '#A8B820', text: '#fff' },
    Rock:     { bg: '#B8A038', text: '#fff' },
    Ghost:    { bg: '#705898', text: '#fff' },
    Dragon:   { bg: '#7038F8', text: '#fff' },
    Dark:     { bg: '#705848', text: '#fff' },
    Steel:    { bg: '#B8B8D0', text: '#333' },
    Fairy:    { bg: '#EE99AC', text: '#333' },
};

export const ALL_TYPES = Object.keys(TYPE_COLORS);

export const NATURES = [
    'Hardy','Lonely','Brave','Adamant','Naughty',
    'Bold','Docile','Relaxed','Impish','Lax',
    'Timid','Hasty','Serious','Jolly','Naive',
    'Modest','Mild','Quiet','Bashful','Rash',
    'Calm','Gentle','Sassy','Careful','Quirky',
];

export const NATURE_EFFECTS = {
    Lonely:  { up: 'atk', down: 'def' },
    Brave:   { up: 'atk', down: 'spe' },
    Adamant: { up: 'atk', down: 'spa' },
    Naughty: { up: 'atk', down: 'spd' },
    Bold:    { up: 'def', down: 'atk' },
    Relaxed: { up: 'def', down: 'spe' },
    Impish:  { up: 'def', down: 'spa' },
    Lax:     { up: 'def', down: 'spd' },
    Timid:   { up: 'spe', down: 'atk' },
    Jolly:   { up: 'spe', down: 'spa' },
    Naive:   { up: 'spe', down: 'spd' },
    Hasty:   { up: 'spe', down: 'def' },
    Modest:  { up: 'spa', down: 'atk' },
    Mild:    { up: 'spa', down: 'def' },
    Quiet:   { up: 'spa', down: 'spe' },
    Rash:    { up: 'spa', down: 'spd' },
    Calm:    { up: 'spd', down: 'atk' },
    Gentle:  { up: 'spd', down: 'def' },
    Sassy:   { up: 'spd', down: 'spe' },
    Careful: { up: 'spd', down: 'spa' },
};

export function natureMod(nature, stat) {
    const e = NATURE_EFFECTS[nature];
    if (!e) return 1.0;
    if (e.up === stat) return 1.1;
    if (e.down === stat) return 0.9;
    return 1.0;
}

export function calcHp(base, iv, ev, level) {
    if (base === 1) return 1; // Shedinja
    return Math.floor((2 * base + iv + Math.floor(ev / 4)) * level / 100) + level + 10;
}

export function calcStat(base, iv, ev, level, natureMod) {
    return Math.floor((Math.floor((2 * base + iv + Math.floor(ev / 4)) * level / 100) + 5) * natureMod);
}

export function getEffectiveStats(pokemon, ivs, evs, nature, level) {
    const nm = (stat) => natureMod(nature, stat);
    return {
        hp:  calcHp(pokemon.hp, ivs.hp, evs.hp, level),
        atk: calcStat(pokemon.attack, ivs.atk, evs.atk, level, nm('atk')),
        def: calcStat(pokemon.defense, ivs.def, evs.def, level, nm('def')),
        spa: calcStat(pokemon.special_attack, ivs.spa, evs.spa, level, nm('spa')),
        spd: calcStat(pokemon.special_defense, ivs.spd, evs.spd, level, nm('spd')),
        spe: calcStat(pokemon.speed, ivs.spe, evs.spe, level, nm('spe')),
    };
}

// Type effectiveness chart (Gen IX)
export const TYPE_CHART = {
    Normal:   { Ghost: 0, Rock: 0.5, Steel: 0.5 },
    Fire:     { Fire: 0.5, Water: 0.5, Grass: 2, Ice: 2, Bug: 2, Rock: 0.5, Dragon: 0.5, Steel: 2 },
    Water:    { Fire: 2, Water: 0.5, Grass: 0.5, Ground: 2, Rock: 2, Dragon: 0.5 },
    Electric: { Water: 2, Electric: 0.5, Grass: 0.5, Ground: 0, Flying: 2, Dragon: 0.5 },
    Grass:    { Fire: 0.5, Water: 2, Grass: 0.5, Poison: 0.5, Ground: 2, Flying: 0.5, Bug: 0.5, Rock: 2, Dragon: 0.5, Steel: 0.5 },
    Ice:      { Water: 0.5, Grass: 2, Ice: 0.5, Ground: 2, Flying: 2, Dragon: 2, Steel: 0.5 },
    Fighting: { Normal: 2, Ice: 2, Poison: 0.5, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2, Ghost: 0, Dark: 2, Steel: 2, Fairy: 0.5 },
    Poison:   { Grass: 2, Poison: 0.5, Ground: 0.5, Rock: 0.5, Ghost: 0.5, Steel: 0, Fairy: 2 },
    Ground:   { Fire: 2, Electric: 2, Grass: 0.5, Poison: 2, Flying: 0, Bug: 0.5, Rock: 2, Steel: 2 },
    Flying:   { Electric: 0.5, Grass: 2, Fighting: 2, Bug: 2, Rock: 0.5, Steel: 0.5 },
    Psychic:  { Fighting: 2, Poison: 2, Psychic: 0.5, Dark: 0, Steel: 0.5 },
    Bug:      { Fire: 0.5, Grass: 2, Fighting: 0.5, Flying: 0.5, Psychic: 2, Ghost: 0.5, Dark: 2, Steel: 0.5, Fairy: 0.5 },
    Rock:     { Fire: 2, Ice: 2, Fighting: 0.5, Ground: 0.5, Flying: 2, Bug: 2, Steel: 0.5 },
    Ghost:    { Normal: 0, Psychic: 2, Ghost: 2, Dark: 0.5 },
    Dragon:   { Dragon: 2, Steel: 0.5, Fairy: 0 },
    Dark:     { Fighting: 0.5, Psychic: 2, Ghost: 2, Dark: 0.5, Fairy: 0.5 },
    Steel:    { Fire: 0.5, Water: 0.5, Electric: 0.5, Ice: 2, Rock: 2, Steel: 0.5, Fairy: 2 },
    Fairy:    { Fire: 0.5, Fighting: 2, Poison: 0.5, Dragon: 2, Dark: 2, Steel: 0.5 },
};

export function typeEffectiveness(moveType, defType1, defType2) {
    const chart = TYPE_CHART[moveType] || {};
    let eff = chart[defType1] ?? 1.0;
    if (defType2) eff *= chart[defType2] ?? 1.0;
    return eff;
}

export function typeLabel(eff) {
    if (eff === 0)   return 'Immune';
    if (eff < 1)     return `${eff}x`;
    if (eff === 1)   return '1x';
    return `${eff}x`;
}

export function calculateDamage({ attacker, attackerIvs, attackerEvs, attackerNature, attackerLevel,
                                   defender, defenderIvs, defenderEvs, defenderNature, defenderLevel,
                                   move, conditions }) {
    const nm = (nature, stat) => natureMod(nature, stat);

    const atkStat = move.category === 'Physical'
        ? calcStat(attacker.attack,         attackerIvs.atk, attackerEvs.atk, attackerLevel, nm(attackerNature, 'atk'))
        : calcStat(attacker.special_attack,  attackerIvs.spa, attackerEvs.spa, attackerLevel, nm(attackerNature, 'spa'));

    const defStat = move.category === 'Physical'
        ? calcStat(defender.defense,         defenderIvs.def, defenderEvs.def, defenderLevel, nm(defenderNature, 'def'))
        : calcStat(defender.special_defense, defenderIvs.spd, defenderEvs.spd, defenderLevel, nm(defenderNature, 'spd'));

    const defHp = calcHp(defender.hp, defenderIvs.hp, defenderEvs.hp, defenderLevel);

    // Base damage (step 1)
    const levelPart = Math.floor((2 * attackerLevel / 5) + 2);
    let baseDamage = Math.floor(Math.floor(levelPart * (move.power || 0) * atkStat / defStat) / 50) + 2;

    // Targets
    const targets = conditions.multiTarget ? 0.75 : 1;

    // Weather
    let weather = 1;
    if (conditions.weather === 'rain') {
        if (move.type === 'Water') weather = 1.5;
        if (move.type === 'Fire')  weather = 0.5;
    } else if (conditions.weather === 'harshsunlight') {
        if (move.type === 'Fire')  weather = 1.5;
        if (move.type === 'Water') weather = 0.5;
    }

    // Glaive Rush
    const glaiveRush = conditions.glaiveRush ? 2 : 1;

    // Critical hit
    const critical = conditions.critical ? 1.5 : 1;

    // STAB
    const hasStab = move.type === attacker.type1 || move.type === attacker.type2;
    const stab = hasStab ? (conditions.adaptability ? 2.0 : 1.5) : 1.0;

    // Type effectiveness
    const typeEff = typeEffectiveness(move.type, defender.type1, defender.type2);

    // Burn
    const burn = (conditions.burn && move.category === 'Physical') ? 0.5 : 1;

    // Terrain
    let terrain = 1;
    const grounded = conditions.attackerGrounded ?? true;
    if (grounded) {
        if (conditions.terrain === 'electric' && move.type === 'Electric') terrain = 1.3;
        if (conditions.terrain === 'grassy'   && move.type === 'Grass')   terrain = 1.3;
        if (conditions.terrain === 'psychic'  && move.type === 'Psychic') terrain = 1.3;
        if (conditions.terrain === 'misty'    && move.type === 'Dragon')  terrain = 0.5;
    }

    // Screen (Light Screen / Reflect) - halves damage
    const screen = conditions.screen ? 0.5 : 1;

    // other multiplied
    const other = terrain * screen * (conditions.otherMod ?? 1);

    // Calculate all 16 rolls (85/100 to 100/100)
    const rolls = [];
    for (let roll = 85; roll <= 100; roll++) {
        let dmg = baseDamage;
        dmg = Math.floor(dmg * targets);
        dmg = Math.floor(dmg * weather);
        dmg = Math.floor(dmg * glaiveRush);
        dmg = Math.floor(dmg * critical);
        dmg = Math.floor(dmg * (roll / 100));
        dmg = Math.floor(dmg * stab);
        dmg = Math.floor(dmg * typeEff);
        dmg = Math.floor(dmg * burn);
        dmg = Math.floor(dmg * other);
        rolls.push(Math.max(1, dmg));
    }

    const minDmg = Math.min(...rolls);
    const maxDmg = Math.max(...rolls);

    return {
        rolls,
        minDamage: minDmg,
        maxDamage: maxDmg,
        defenderHp: defHp,
        attackerStat: atkStat,
        defenderStat: defStat,
        typeEffectiveness: typeEff,
        stab,
        minPercent: (minDmg / defHp * 100).toFixed(1),
        maxPercent: (maxDmg / defHp * 100).toFixed(1),
        guaranteedKo: minDmg >= defHp,
        possibleKo: maxDmg >= defHp,
        hitsToKo: Math.ceil(defHp / maxDmg),
    };
}
