import { useState, useEffect } from 'react';
import { ALL_TYPES, typeEffectiveness } from '../utils/damage';
import TypeBadge from './TypeBadge';

const DEF_GROUPS = [
    {
        mult: 4,
        label: 'Extremely effective',
        show: '4×',
        cls: 'text-red-400 font-bold',
        bg: 'bg-red-900/25',
        borderCls: 'border-red-800/40',
    },
    {
        mult: 2,
        label: 'Weak',
        show: '2×',
        cls: 'text-orange-400',
        bg: 'bg-orange-900/15',
        borderCls: 'border-orange-800/30',
    },
    {
        mult: 1,
        label: 'Normal',
        show: '1×',
        cls: 'text-gray-400',
        bg: '',
        borderCls: '',
    },
    {
        mult: 0.5,
        label: 'Resistant',
        show: '½×',
        cls: 'text-blue-400',
        bg: 'bg-blue-900/15',
        borderCls: 'border-blue-800/30',
    },
    {
        mult: 0.25,
        label: 'Mostly ineffective',
        show: '¼×',
        cls: 'text-blue-300',
        bg: 'bg-blue-900/25',
        borderCls: 'border-blue-700/30',
    },
    {
        mult: 0,
        label: 'Immune',
        show: '0×',
        cls: 'text-gray-500',
        bg: 'bg-gray-900/50',
        borderCls: '',
    },
];

export default function TypeDefensePanel({ defender }) {
    const [type1, setType1] = useState(defender?.type1 || '');
    const [type2, setType2] = useState(defender?.type2 || '');

    // Sync from defender Pokémon whenever it changes
    useEffect(() => {
        setType1(defender?.type1 || '');
        setType2(defender?.type2 || '');
    }, [defender?.type1, defender?.type2]);

    const analysis = type1
        ? ALL_TYPES.map(atkType => ({
            type: atkType,
            mult: typeEffectiveness(atkType, type1, type2 || null),
          }))
        : [];

    const groupedTypes = DEF_GROUPS.map(g => ({
        ...g,
        types: analysis.filter(a => a.mult === g.mult),
    })).filter(g => g.types.length > 0);

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-700">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    🛡️ Type Defense
                </h3>

                <div className="mt-2 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-500 w-14 flex-shrink-0">Type 1:</label>
                        <select
                            value={type1}
                            onChange={e => setType1(e.target.value)}
                            className="flex-1 bg-gray-800 border border-gray-700 rounded px-2 py-0.5 text-white text-xs
                                       focus:outline-none focus:border-blue-500 transition"
                        >
                            <option value="">— Required —</option>
                            {ALL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-500 w-14 flex-shrink-0">Type 2:</label>
                        <select
                            value={type2}
                            onChange={e => setType2(e.target.value)}
                            className="flex-1 bg-gray-800 border border-gray-700 rounded px-2 py-0.5 text-white text-xs
                                       focus:outline-none focus:border-blue-500 transition"
                        >
                            <option value="">— None (single type) —</option>
                            {ALL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                </div>

                {type1 && (
                    <div className="flex gap-1.5 mt-2 items-center">
                        <TypeBadge type={type1} />
                        {type2 && <TypeBadge type={type2} />}
                        <span className="text-xs text-gray-500 ml-1">— incoming type matchups</span>
                    </div>
                )}
            </div>

            {!type1 ? (
                <div className="px-4 py-6 text-center text-gray-600 text-sm">
                    Select a type or pick a defender Pokémon.
                </div>
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
