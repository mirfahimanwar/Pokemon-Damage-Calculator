import { useState, useEffect, useRef, useCallback } from 'react';
import TypeBadge from './TypeBadge';
import axios from 'axios';

export default function MoveSearch({ value, onChange, attackerTypes }) {
    const [query, setQuery]     = useState('');
    const [results, setResults] = useState([]);
    const [open, setOpen]       = useState(false);
    const [loading, setLoading] = useState(false);
    const debounceRef           = useRef(null);
    const containerRef          = useRef(null);

    const search = useCallback((q) => {
        if (!q.trim()) { setResults([]); return; }
        setLoading(true);
        axios.get('/api/moves', { params: { search: q } })
            .then(r => setResults(r.data.slice(0, 30)))
            .catch(() => setResults([]))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => search(query), 250);
    }, [query, search]);

    useEffect(() => {
        const handler = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    function select(move) {
        onChange(move);
        setQuery(move.name);
        setOpen(false);
    }

    function handleInputChange(e) {
        setQuery(e.target.value);
        setOpen(true);
        if (!e.target.value) onChange(null);
    }

    const catIcon = (cat) => {
        if (cat === 'Physical') return '⚔️';
        if (cat === 'Special')  return '✨';
        return '🔵';
    };

    return (
        <div className="relative" ref={containerRef}>
            <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">
                Move
            </label>
            <input
                type="text"
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500
                           focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                placeholder="Search moves..."
                value={query}
                onChange={handleInputChange}
                onFocus={() => query && setOpen(true)}
            />
            {open && (results.length > 0 || loading) && (
                <ul className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl
                               max-h-72 overflow-y-auto">
                    {loading && <li className="px-3 py-2 text-gray-400 text-sm">Searching...</li>}
                    {results.map(m => {
                        const isStab = attackerTypes && (m.type === attackerTypes[0] || m.type === attackerTypes[1]);
                        return (
                            <li
                                key={m.id}
                                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-700 transition"
                                onMouseDown={() => select(m)}
                            >
                                <span className="text-base">{catIcon(m.category)}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-white text-sm">{m.name}</span>
                                        {isStab && <span className="text-yellow-400 text-xs font-bold">STAB</span>}
                                    </div>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <TypeBadge type={m.type} />
                                        <span className="text-gray-400 text-xs">{m.category}</span>
                                        {m.power && <span className="text-gray-400 text-xs">Pwr: {m.power}</span>}
                                        {m.accuracy && <span className="text-gray-400 text-xs">Acc: {m.accuracy}%</span>}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
            {value && (
                <div className="mt-3 p-3 bg-gray-800 border border-gray-700 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white">{value.name}</span>
                        <span className="text-lg">{catIcon(value.category)}</span>
                        <TypeBadge type={value.type} />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center">
                            <div className="text-gray-400 text-xs">Power</div>
                            <div className="text-white font-semibold">{value.power ?? '—'}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-gray-400 text-xs">Accuracy</div>
                            <div className="text-white font-semibold">{value.accuracy ? `${value.accuracy}%` : '—'}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-gray-400 text-xs">PP</div>
                            <div className="text-white font-semibold">{value.pp ?? '—'}</div>
                        </div>
                    </div>
                    {value.effect && (
                        <p className="text-gray-400 text-xs mt-2 leading-relaxed">{value.effect}</p>
                    )}
                </div>
            )}
        </div>
    );
}
