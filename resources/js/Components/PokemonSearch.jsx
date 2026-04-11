import { useState, useEffect, useRef, useCallback } from 'react';
import TypeBadge from './TypeBadge';
import axios from 'axios';
import { isChampionsEligible } from '../utils/championsEligible';

export default function PokemonSearch({ label, value, onChange, championsOnly = false }) {
    const [query, setQuery]       = useState('');
    const [results, setResults]   = useState([]);
    const [open, setOpen]         = useState(false);
    const [loading, setLoading]   = useState(false);
    const debounceRef             = useRef(null);
    const containerRef            = useRef(null);

    const search = useCallback((q) => {
        if (!q.trim()) { setResults([]); return; }
        setLoading(true);
        axios.get('/api/pokemon', { params: { search: q } })
            .then(r => setResults(r.data.slice(0, 30)))
            .catch(() => setResults([]))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => search(query), 250);
    }, [query, search]);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    function select(pokemon) {
        onChange(pokemon);
        setQuery(pokemon.name);
        setOpen(false);
    }

    function handleInputChange(e) {
        setQuery(e.target.value);
        setOpen(true);
        if (!e.target.value) onChange(null);
    }

    return (
        <div className="relative" ref={containerRef}>
            <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">
                {label}
            </label>
            <input
                type="text"
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500
                           focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                placeholder="Search Pokémon..."
                value={query}
                onChange={handleInputChange}
                onFocus={() => query && setOpen(true)}
            />
            {open && (results.length > 0 || loading) && (
                <ul className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl
                               max-h-72 overflow-y-auto">
                    {loading && (
                        <li className="px-3 py-2 text-gray-400 text-sm">Searching...</li>
                    )}
                    {results.map(p => (
                        <li
                            key={p.id}
                            className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-700 transition"
                            onMouseDown={() => select(p)}
                        >
                            <img
                                src={p.image_url}
                                alt={p.name}
                                className="w-9 h-9 object-contain"
                                onError={e => { e.target.style.display = 'none'; }}
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-white text-sm">{p.name}</span>
                                    <span className="text-gray-500 text-xs">#{String(p.national_dex).padStart(4, '0')}</span>
                                </div>
                                <div className="flex gap-1 mt-0.5">
                                    <TypeBadge type={p.type1} />
                                    {p.type2 && <TypeBadge type={p.type2} />}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {value && (
                <div className="mt-3 flex items-center gap-3 p-3 bg-gray-800 border border-gray-700 rounded-lg relative">
                    <img
                        src={value.image_url}
                        alt={value.name}
                        className="w-16 h-16 object-contain"
                        onError={e => { e.target.style.display = 'none'; }}
                    />
                    <div>
                        <div className="font-bold text-white">{value.name}</div>
                        <div className="text-gray-400 text-xs">#{String(value.national_dex).padStart(4, '0')}</div>
                        <div className="flex gap-1 mt-1">
                            <TypeBadge type={value.type1} />
                            {value.type2 && <TypeBadge type={value.type2} />}
                        </div>
                    </div>
                    {championsOnly && !isChampionsEligible(value.name) && (
                        <div className="absolute inset-0 rounded-lg bg-red-900/60 flex items-center justify-center">
                            <span className="text-xs font-bold text-red-200 bg-red-800/90 px-2 py-1 rounded-md
                                           border border-red-600 text-center leading-tight">
                                Not Champions Eligible
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
