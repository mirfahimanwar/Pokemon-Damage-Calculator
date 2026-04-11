import { useMemo } from 'react';
import { NATURES, NATURE_EFFECTS, getEffectiveStats } from '../utils/damage';

const STATS = [
    { key: 'hp',  label: 'HP',      ivKey: 'hp',  evKey: 'hp' },
    { key: 'atk', label: 'Attack',  ivKey: 'atk', evKey: 'atk' },
    { key: 'def', label: 'Defense', ivKey: 'def', evKey: 'def' },
    { key: 'spa', label: 'Sp. Atk', ivKey: 'spa', evKey: 'spa' },
    { key: 'spd', label: 'Sp. Def', ivKey: 'spd', evKey: 'spd' },
    { key: 'spe', label: 'Speed',   ivKey: 'spe', evKey: 'spe' },
];

export default function StatPanel({ pokemon, level, setLevel, ivs, setIvs, evs, setEvs, nature, setNature }) {
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
                    {NATURES.map(n => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
            </div>

            {/* Stats table */}
            {pokemon && (
                <div className="mt-2">
                    <div className="grid grid-cols-5 gap-1 text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1 px-1">
                        <span>Stat</span>
                        <span className="text-center">Base</span>
                        <span className="text-center">IV</span>
                        <span className="text-center">EV</span>
                        <span className="text-center">Final</span>
                    </div>
                    {STATS.map(({ key, label, ivKey, evKey }) => {
                        const base = key === 'hp' ? pokemon.hp
                            : key === 'atk' ? pokemon.attack
                            : key === 'def' ? pokemon.defense
                            : key === 'spa' ? pokemon.special_attack
                            : key === 'spd' ? pokemon.special_defense
                            : pokemon.speed;

                        return (
                            <div key={key} className="grid grid-cols-5 gap-1 items-center mb-1">
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
                                <span className={`text-center text-xs font-bold ${statColor(key)}`}>
                                    {effective ? effective[key] : '—'}
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
