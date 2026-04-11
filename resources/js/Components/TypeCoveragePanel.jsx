import { useState, useEffect } from 'react';
import { ALL_TYPES, TYPE_CHART } from '../utils/damage';
import TypeBadge from './TypeBadge';

// Effectiveness of an attacking type against a single defending type
function singleEff(atkType, defType) {
    return TYPE_CHART[atkType]?.[defType] ?? 1;
}

const GROUPS = [
    { mult: 2,   label: 'Super effective',    show: '2×', cls: 'text-green-400', bg: 'bg-green-900/20' },
    { mult: 0.5, label: 'Not very effective', show: '½×', cls: 'text-orange-400', bg: 'bg-orange-900/10' },
    { mult: 0,   label: 'No effect (Immune)', show: '0×', cls: 'text-gray-500',   bg: 'bg-gray-900/40' },
    { mult: 1,   label: 'Normal',             show: '1×', cls: 'text-gray-400',   bg: '' },
];

export default function TypeCoveragePanel({ move }) {
    const [selectedType, setSelectedType] = useState(move?.type || '');
    const [userOverride, setUserOverride] = useState(false);

    // Auto-sync from move type unless user has manually overridden
    useEffect(() => {
        if (!userOverride && move?.type) {
            setSelectedType(move.type);
        }
    }, [move?.type, userOverride]);

    const coverage = selectedType
        ? ALL_TYPES.map(dt => ({ type: dt, mult: singleEff(selectedType, dt) }))
        : [];

    const groupedTypes = GROUPS.map(g => ({
        ...g,
        types: coverage.filter(c => c.mult === g.mult),
    })).filter(g => g.types.length > 0);

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-700">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    🗡️ Type Coverage
                </h3>

                <div className="mt-2 flex items-center gap-2">
                    <label className="text-xs text-gray-500 flex-shrink-0">Attacking type:</label>
                    <select
                        value={selectedType}
                        onChange={e => {
                            setSelectedType(e.target.value);
                            setUserOverride(true);
                        }}
                        className="flex-1 bg-gray-800 border border-gray-700 rounded px-2 py-0.5 text-white text-xs
                                   focus:outline-none focus:border-red-500 transition"
                    >
                        <option value="">— Select type —</option>
                        {ALL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>

                    {/* Re-sync from move button */}
                    {move?.type && userOverride && (
                        <button
                            onClick={() => { setSelectedType(move.type); setUserOverride(false); }}
                            className="text-xs text-blue-400 hover:text-blue-300 flex-shrink-0 transition"
                            title={`Sync to ${move.type} (current move)`}
                        >
                            ↺
                        </button>
                    )}
                </div>

                {selectedType && (
                    <div className="mt-2 flex items-center gap-1.5">
                        <TypeBadge type={selectedType} />
                        <span className="text-xs text-gray-500">vs. single-type defenders</span>
                    </div>
                )}
            </div>

            {!selectedType ? (
                <div className="px-4 py-6 text-center text-gray-600 text-sm">—</div>
            ) : (
                <div className="divide-y divide-gray-800">
                    {groupedTypes.map(({ mult, label, show, cls, bg, types }) => (
                        <div key={mult} className={`px-3 py-2.5 ${bg}`}>
                            <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${cls}`}>
                                {show} — {label}
                                <span className="ml-1 font-normal text-gray-500">({types.length})</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {types.map(({ type }) => (
                                    <TypeBadge key={type} type={type} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
