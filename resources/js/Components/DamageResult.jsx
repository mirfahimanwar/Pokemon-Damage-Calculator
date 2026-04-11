import TypeBadge from './TypeBadge';

function effLabel(eff) {
    if (eff === 0)    return { label: 'Immune (0×)',                  cls: 'text-gray-400' };
    if (eff === 0.25) return { label: 'Mostly ineffective (¼×)',       cls: 'text-blue-300' };
    if (eff === 0.5)  return { label: 'Not very effective (½×)',        cls: 'text-orange-300' };
    if (eff === 1)    return { label: 'Normal effectiveness',           cls: 'text-gray-300' };
    if (eff === 2)    return { label: 'Super effective (2×)!',          cls: 'text-green-400' };
    if (eff === 4)    return { label: 'Extremely effective (4×)!!',     cls: 'text-red-400 font-bold' };
    return { label: `${eff}×`, cls: 'text-gray-300' };
}

export default function DamageResult({ result, move }) {
    if (!result) return null;

    const { label: effText, cls: effCls } = effLabel(result.typeEffectiveness);
    const koLabel = result.guaranteedKo ? '1HKO!' : result.possibleKo ? 'Possible 1HKO' : `${result.hitsToKo}HKO`;
    const koClass = result.guaranteedKo ? 'text-red-400 font-bold text-lg' : result.possibleKo ? 'text-orange-400 font-semibold' : 'text-gray-300';

    // Display rolls as a compact range bar
    const maxRoll = result.defenderHp;

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Damage Result
                {move && <TypeBadge type={move.type} size="sm" />}
            </h3>

            {/* Type effectiveness */}
            <p className={`text-sm ${effCls}`}>{effText}</p>

            {/* Damage range */}
            <div className="space-y-1">
                <div className="flex justify-between items-baseline">
                    <span className="text-gray-400 text-sm">Damage Range</span>
                    <span className="text-white font-bold text-xl">
                        {result.minDamage} – {result.maxDamage}
                    </span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                    <span>{result.minPercent}% – {result.maxPercent}% of HP</span>
                    <span className={koClass}>{koLabel}</span>
                </div>

                {/* HP bar */}
                <div className="w-full bg-gray-900 rounded-full h-3 mt-2 relative overflow-hidden">
                    <div
                        className="h-3 rounded-full bg-green-500 absolute top-0 left-0 transition-all"
                        style={{ width: `${Math.min(100, result.maxPercent)}%` }}
                    />
                    <div
                        className="h-3 rounded-full bg-green-600 absolute top-0 left-0 transition-all"
                        style={{ width: `${Math.min(100, result.minPercent)}%` }}
                    />
                    {result.guaranteedKo && (
                        <div className="absolute inset-0 bg-red-500 opacity-20 rounded-full" />
                    )}
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                    <span>0 HP</span>
                    <span>{result.defenderHp} HP (max)</span>
                </div>
            </div>

            {/* Stat indicators */}
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="bg-gray-900 rounded p-2">
                    <div className="text-gray-400 text-xs">Atk Stat</div>
                    <div className="text-white font-semibold">{result.attackerStat}</div>
                </div>
                <div className="bg-gray-900 rounded p-2">
                    <div className="text-gray-400 text-xs">Def Stat</div>
                    <div className="text-white font-semibold">{result.defenderStat}</div>
                </div>
                <div className="bg-gray-900 rounded p-2">
                    <div className="text-gray-400 text-xs">STAB</div>
                    <div className="text-white font-semibold">{result.stab}×</div>
                </div>
            </div>

            {/* All 16 rolls */}
            <div>
                <div className="text-xs text-gray-400 mb-1">All 16 damage rolls</div>
                <div className="flex flex-wrap gap-1">
                    {result.rolls.map((r, i) => (
                        <span
                            key={i}
                            className={`px-1.5 py-0.5 rounded text-xs font-mono ${
                                r >= result.defenderHp ? 'bg-red-900 text-red-300' : 'bg-gray-700 text-gray-300'
                            }`}
                        >
                            {r}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
