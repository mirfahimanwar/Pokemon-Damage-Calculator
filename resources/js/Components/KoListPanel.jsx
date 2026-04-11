import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { calculateDamage } from '../utils/damage';
import TypeBadge from './TypeBadge';

const DEF_IVS = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 };
const DEF_EVS = { hp: 0,  atk: 0,  def: 0,  spa: 0,  spd: 0,  spe: 0  };

function Row({ pokemon, result }) {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-gray-800/60 last:border-0 hover:bg-gray-800/40 transition">
            <img
                src={pokemon.image_url}
                alt={pokemon.name}
                className="w-7 h-7 object-contain flex-shrink-0"
                onError={e => { e.target.style.display = 'none'; }}
            />
            <div className="flex-1 min-w-0">
                <div className="text-white text-xs font-medium truncate">{pokemon.name}</div>
                <div className="flex gap-0.5 mt-0.5">
                    <TypeBadge type={pokemon.type1} size="sm" />
                    {pokemon.type2 && <TypeBadge type={pokemon.type2} size="sm" />}
                </div>
            </div>
            <div className="text-right flex-shrink-0">
                <div className="text-xs font-mono text-gray-300">{result.minPercent}–{result.maxPercent}%</div>
                <div className="text-xs text-gray-500">{result.defenderHp} HP</div>
            </div>
        </div>
    );
}

function Section({ title, emoji, colorClass, items, defaultOpen }) {
    const [open, setOpen] = useState(defaultOpen);
    if (items.length === 0) return null;

    return (
        <div>
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-3 py-2 bg-gray-900 sticky top-0 z-10
                           border-b border-gray-700 hover:bg-gray-800 transition"
            >
                <span className={`font-semibold text-xs uppercase tracking-wider ${colorClass}`}>
                    {emoji} {title}
                </span>
                <span className="text-xs font-bold bg-gray-700 text-gray-200 px-2 py-0.5 rounded-full">
                    {items.length}
                </span>
            </button>
            {open && items.map(({ pokemon, result }) => (
                <Row key={pokemon.id} pokemon={pokemon} result={result} />
            ))}
        </div>
    );
}

export default function KoListPanel({
    attacker, attackerIvs, attackerEvs, attackerNature, attackerLevel,
    move, conditions,
}) {
    const [allPokemon, setAllPokemon] = useState([]);
    const [loading, setLoading]       = useState(true);
    const [filter, setFilter]         = useState('');

    // Fetch all 1,025 Pokémon once
    useEffect(() => {
        axios.get('/api/pokemon')
            .then(r => setAllPokemon(r.data))
            .finally(() => setLoading(false));
    }, []);

    const groups = useMemo(() => {
        if (!attacker || !move?.power || !allPokemon.length) return null;

        const guaranteed = [], possible = [], none = [];
        const q = filter.toLowerCase();

        for (const pokemon of allPokemon) {
            if (q && !pokemon.name.toLowerCase().includes(q)) continue;
            try {
                const result = calculateDamage({
                    attacker,
                    attackerIvs, attackerEvs, attackerNature, attackerLevel,
                    defender: pokemon,
                    defenderIvs: DEF_IVS,
                    defenderEvs: DEF_EVS,
                    defenderNature: 'Hardy',
                    defenderLevel: attackerLevel,
                    move, conditions,
                });
                if (result.guaranteedKo)    guaranteed.push({ pokemon, result });
                else if (result.possibleKo) possible.push({ pokemon, result });
                else                        none.push({ pokemon, result });
            } catch { /* immune / status move — skip */ }
        }

        return { guaranteed, possible, none };
    }, [attacker, attackerIvs, attackerEvs, attackerNature, attackerLevel,
        move, conditions, allPokemon, filter]);

    const ready = attacker && move?.power;

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-700">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    ⚔️ 1HKO Potential
                </h3>
                {ready ? (
                    <p className="text-xs text-gray-400 mt-0.5">
                        {attacker.name} using <span className="text-white">{move.name}</span> vs. all Pokémon
                        (Lv{attackerLevel}, 31 IVs, 0 EVs, Hardy)
                    </p>
                ) : (
                    <p className="text-xs text-gray-500 mt-0.5">
                        Select an attacker + damaging move to see results.
                    </p>
                )}
            </div>

            {!ready ? (
                <div className="px-4 py-8 text-center text-gray-600 text-sm">
                    —
                </div>
            ) : loading ? (
                <div className="px-4 py-6 text-center text-gray-500 text-sm animate-pulse">
                    Loading Pokémon data...
                </div>
            ) : groups ? (
                <>
                    {/* Filter */}
                    <div className="px-3 py-2 border-b border-gray-800">
                        <input
                            type="text"
                            placeholder="Filter by name…"
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-xs
                                       placeholder-gray-600 focus:outline-none focus:border-red-500 transition"
                        />
                    </div>

                    {/* Summary bar */}
                    <div className="grid grid-cols-3 divide-x divide-gray-800 border-b border-gray-800">
                        <div className="py-2 text-center">
                            <div className="text-green-400 font-bold text-sm">{groups.guaranteed.length}</div>
                            <div className="text-gray-500 text-xs">Guaranteed</div>
                        </div>
                        <div className="py-2 text-center">
                            <div className="text-yellow-400 font-bold text-sm">{groups.possible.length}</div>
                            <div className="text-gray-500 text-xs">Possible</div>
                        </div>
                        <div className="py-2 text-center">
                            <div className="text-gray-400 font-bold text-sm">{groups.none.length}</div>
                            <div className="text-gray-500 text-xs">Cannot</div>
                        </div>
                    </div>

                    {/* Scrollable list */}
                    <div className="overflow-y-auto max-h-[480px]">
                        <Section
                            title="Guaranteed 1HKO" emoji="✅"
                            colorClass="text-green-400"
                            items={groups.guaranteed} defaultOpen={true}
                        />
                        <Section
                            title="Possible 1HKO" emoji="⚡"
                            colorClass="text-yellow-400"
                            items={groups.possible} defaultOpen={true}
                        />
                        <Section
                            title="Cannot 1HKO" emoji="❌"
                            colorClass="text-gray-400"
                            items={groups.none} defaultOpen={false}
                        />
                        {groups.guaranteed.length === 0 && groups.possible.length === 0 && groups.none.length === 0 && (
                            <div className="px-4 py-6 text-center text-gray-500 text-sm">
                                No Pokémon match "{filter}"
                            </div>
                        )}
                    </div>
                </>
            ) : null}
        </div>
    );
}
