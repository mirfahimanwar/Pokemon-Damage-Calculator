import { useMemo, useState } from 'react';
import { NATURES, NATURE_EFFECTS, getEffectiveStats, statStageMod } from '../utils/damage';
import { isChampionsEligible } from '../utils/championsEligible';

const STAGE_STATS = [
    { key: 'atk', label: 'Atk' },
    { key: 'def', label: 'Def' },
    { key: 'spa', label: 'SpA' },
    { key: 'spd', label: 'SpD' },
    { key: 'spe', label: 'Spe' },
];

const STATS = [
    { key: 'hp',  label: 'HP',      ivKey: 'hp',  evKey: 'hp' },
    { key: 'atk', label: 'Attack',  ivKey: 'atk', evKey: 'atk' },
    { key: 'def', label: 'Defense', ivKey: 'def', evKey: 'def' },
    { key: 'spa', label: 'Sp. Atk', ivKey: 'spa', evKey: 'spa' },
    { key: 'spd', label: 'Sp. Def', ivKey: 'spd', evKey: 'spd' },
    { key: 'spe', label: 'Speed',   ivKey: 'spe', evKey: 'spe' },
];

export default function StatPanel({ pokemon, level, setLevel, ivs, setIvs, evs, setEvs, nature, setNature, stages = {}, setStages = () => {}, allPokemon = [], championsOnly = false }) {
    const [includeEvsIvs, setIncludeEvsIvs] = useState(false);
    function adjustStage(key, delta) {
        setStages(prev => ({ ...prev, [key]: Math.max(-6, Math.min(6, (prev[key] ?? 0) + delta)) }));
    }
    const effective = useMemo(() => {
        if (!pokemon) return null;
        return getEffectiveStats(pokemon, ivs, evs, nature, level);
    }, [pokemon, ivs, evs, nature, level]);

    function updateIv(key, val) {
        const n = Math.max(0, Math.min(31, parseInt(val) || 0));
        setIvs(prev => ({ ...prev, [key]: n }));
    }

    function updateEv(key, val) {
        const n = Math.max(0, Math.min(252, parseInt(val) || 0));
        const total = Object.values({ ...evs, [key]: n }).reduce((a, b) => a + b, 0);
        if (total <= 510) setEvs(prev => ({ ...prev, [key]: n }));
    }

    // Compute stat ranks across eligible pokemon (base stats only, or with max IVs/EVs)
    const statRanks = useMemo(() => {
        if (!pokemon || allPokemon.length === 0) return {};
        const pool = championsOnly ? allPokemon.filter(isChampionsEligible) : allPokemon;
        const ranks = {};
        for (const { key } of STATS) {
            const getVal = (p) => {
                if (!includeEvsIvs) {
                    return key === 'hp' ? p.hp
                        : key === 'atk' ? p.attack
                        : key === 'def' ? p.defense
                        : key === 'spa' ? p.special_attack
                        : key === 'spd' ? p.special_defense
                        : p.speed;
                }
                // With perfect IVs/EVs at the current level
                const perfIvs = { hp:31, atk:31, def:31, spa:31, spd:31, spe:31 };
                const perfEvs = { hp:252, atk:252, def:252, spa:252, spd:252, spe:252 };
                const eff = getEffectiveStats(p, perfIvs, perfEvs, 'Hardy', level);
                return eff[key];
            };
            const currentVal = includeEvsIvs
                ? (effective ? effective[key] : null)
                : (key === 'hp' ? pokemon.hp
                    : key === 'atk' ? pokemon.attack
                    : key === 'def' ? pokemon.defense
                    : key === 'spa' ? pokemon.special_attack
                    : key === 'spd' ? pokemon.special_defense
                    : pokemon.speed);
            if (currentVal == null) { ranks[key] = null; continue; }
            const sorted = pool.map(getVal).sort((a, b) => b - a);
            // rank = first index where sorted value <= currentVal
            let rank = sorted.findIndex(v => v <= currentVal) + 1;
            if (rank === 0) rank = sorted.length;
            ranks[key] = { rank, total: pool.length };
        }
        return ranks;
    }, [pokemon, allPokemon, championsOnly, includeEvsIvs, effective]);

    const natureEffect = NATURE_EFFECTS[nature] || {};

    const statColor = (stat) => {
        if (natureEffect.up === stat)   return 'text-red-400';
        if (natureEffect.down === stat) return 'text-blue-400';
        return 'text-white';
    };

    return (
        <div className="space-y-4">
            {/* Level */}
            <div className="flex items-center gap-3">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-16">Level</label>
                <input
                    type="number" min={1} max={100}
                    value={level}
                    onChange={e => setLevel(Math.max(1, Math.min(100, parseInt(e.target.value) || 50)))}
                    className="w-20 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm
                               focus:outline-none focus:border-red-500"
                />
            </div>

            {/* Nature */}
            <div className="flex items-center gap-3">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-16">Nature</label>
                <select
                    value={nature}
                    onChange={e => setNature(e.target.value)}
                    className="flex-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm
                               focus:outline-none focus:border-red-500"
                >
                    {NATURES.map(n => {
                        const e = NATURE_EFFECTS[n];
                        const STAT_LABEL = { atk: 'Attack', def: 'Defense', spa: 'Sp. Atk', spd: 'Sp. Def', spe: 'Speed' };
                        const label = e
                            ? `${n} (${STAT_LABEL[e.up]} ↑, ${STAT_LABEL[e.down]} ↓)`
                            : n;
                        return <option key={n} value={n}>{label}</option>;
                    })}
                </select>
            </div>

            {/* Stat Stages */}
            <div className="flex items-start gap-3">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-16 pt-1">Stages</label>
                <div className="flex gap-2 flex-wrap">
                    {STAGE_STATS.map(({ key, label }) => {
                        const val = stages[key] ?? 0;
                        return (
                            <div key={key} className="flex flex-col items-center gap-0.5">
                                <button
                                    type="button"
                                    onClick={() => adjustStage(key, 1)}
                                    disabled={val >= 6}
                                    className="w-6 h-5 text-xs bg-gray-700 hover:bg-gray-600 disabled:opacity-30 rounded text-white leading-none"
                                >+</button>
                                <span className={`text-xs font-bold w-6 text-center
                                    ${val > 0 ? 'text-red-400' : val < 0 ? 'text-blue-400' : 'text-gray-500'}`}>
                                    {val > 0 ? `+${val}` : val}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => adjustStage(key, -1)}
                                    disabled={val <= -6}
                                    className="w-6 h-5 text-xs bg-gray-700 hover:bg-gray-600 disabled:opacity-30 rounded text-white leading-none"
                                >−</button>
                                <span className="text-xs text-gray-500">{label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Stats table */}
            {pokemon && (
                <div className="mt-2">
                    <div className="grid gap-1 text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1 px-1"
                         style={{ gridTemplateColumns: '3fr 2fr 2fr 2fr 2fr 3fr' }}>
                        <span>Stat</span>
                        <span className="text-center">Base</span>
                        <span className="text-center">IV</span>
                        <span className="text-center">EV</span>
                        <span className="text-center">Final</span>
                        <span className="text-center flex items-center justify-center gap-1">
                            <button
                                type="button"
                                title={includeEvsIvs ? 'Ranking with max IVs/EVs (click to use base stats)' : 'Ranking by base stat (click to include IVs/EVs)'}
                                onClick={() => setIncludeEvsIvs(v => !v)}
                                className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold transition border
                                    ${ includeEvsIvs
                                        ? 'bg-red-700/60 border-red-500 text-red-200'
                                        : 'bg-gray-700 border-gray-600 text-gray-400 hover:border-gray-400' }`}
                            >
                                {includeEvsIvs && (
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 12 12">
                                        <path d="M10 3L5 9 2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                                    </svg>
                                )}
                                Rank
                            </button>
                        </span>
                    </div>
                    {STATS.map(({ key, label, ivKey, evKey }) => {
                        const base = key === 'hp' ? pokemon.hp
                            : key === 'atk' ? pokemon.attack
                            : key === 'def' ? pokemon.defense
                            : key === 'spa' ? pokemon.special_attack
                            : key === 'spd' ? pokemon.special_defense
                            : pokemon.speed;

                        const rankInfo = statRanks[key];

                        return (
                            <div key={key} className="grid gap-1 items-center mb-1"
                                 style={{ gridTemplateColumns: '3fr 2fr 2fr 2fr 2fr 3fr' }}>
                                <span className={`text-xs font-semibold ${statColor(key)}`}>{label}</span>
                                <span className="text-center text-gray-300 text-xs">{base}</span>
                                <input
                                    type="number" min={0} max={31}
                                    value={ivs[ivKey]}
                                    onChange={e => updateIv(ivKey, e.target.value)}
                                    className="bg-gray-900 border border-gray-700 rounded px-1 py-0.5 text-white text-xs text-center w-full
                                               focus:outline-none focus:border-red-500"
                                />
                                <input
                                    type="number" min={0} max={252}
                                    value={evs[evKey]}
                                    onChange={e => updateEv(evKey, e.target.value)}
                                    className="bg-gray-900 border border-gray-700 rounded px-1 py-0.5 text-white text-xs text-center w-full
                                               focus:outline-none focus:border-red-500"
                                />
                <span className={`text-center text-xs font-bold
                                    ${ key === 'hp'
                                        ? statColor(key)
                                        : (stages[key] ?? 0) > 0 ? 'text-red-400'
                                        : (stages[key] ?? 0) < 0 ? 'text-blue-400'
                                        : statColor(key) }`}>
                                    {effective
                                        ? key === 'hp'
                                            ? effective[key]
                                            : Math.floor(effective[key] * statStageMod(stages[key] ?? 0))
                                        : '—'}
                                </span>
                                <span className="text-center text-xs text-gray-400">
                                    {rankInfo ? (
                                        <span className={`font-semibold ${
                                            rankInfo.rank === 1 ? 'text-yellow-400'
                                            : rankInfo.rank <= 10 ? 'text-green-400'
                                            : rankInfo.rank <= Math.ceil(rankInfo.total * 0.25) ? 'text-blue-400'
                                            : 'text-gray-400'
                                        }`}>
                                            #{rankInfo.rank}/{rankInfo.total}
                                        </span>
                                    ) : '—'}
                                </span>
                            </div>
                        );
                    })}
                    <p className="text-xs text-gray-500 mt-1">
                        EV Total: {Object.values(evs).reduce((a, b) => a + b, 0)} / 510
                    </p>
                </div>
            )}
        </div>
    );
}
