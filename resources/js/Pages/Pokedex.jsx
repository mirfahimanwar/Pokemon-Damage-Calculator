import { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import TypeBadge from '../Components/TypeBadge';
import { isChampionsEligible } from '../utils/championsEligible';

// ── Stat bar ────────────────────────────────────────────────────────────────

const STAT_MAX = 255; // hard cap (HP of Blissey)

function statColor(v) {
    if (v <= 49)  return '#f87171'; // red-400
    if (v <= 79)  return '#fb923c'; // orange-400
    if (v <= 99)  return '#facc15'; // yellow-400
    if (v <= 119) return '#a3e635'; // lime-400
    if (v <= 149) return '#4ade80'; // green-400
    return '#60a5fa';               // blue-400
}

function StatBar({ value }) {
    const pct = Math.min(100, (value / STAT_MAX) * 100);
    const color = statColor(value);
    return (
        <div className="flex items-center gap-2">
            <span className="w-8 text-right text-xs font-semibold tabular-nums" style={{ color }}>
                {value}
            </span>
            <div className="flex-1 h-2 rounded-full bg-gray-700 overflow-hidden" style={{ minWidth: '60px' }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
            </div>
        </div>
    );
}

// ── Column definitions ───────────────────────────────────────────────────────

const STAT_KEYS = ['hp', 'attack', 'defense', 'special_attack', 'special_defense', 'speed'];
const STAT_LABELS = { hp: 'HP', attack: 'Atk', defense: 'Def', special_attack: 'Sp.Atk', special_defense: 'Sp.Def', speed: 'Spd' };

function computeTotal(p) {
    return p.hp + p.attack + p.defense + p.special_attack + p.special_defense + p.speed;
}

// ── Main component ───────────────────────────────────────────────────────────

const SUB_TABS = [
    { key: 'all',        label: 'All' },
    { key: 'champions',  label: '🏆 Champions' },
];

export default function Pokedex() {
    const [pokemon, setPokemon]   = useState([]);
    const [loading, setLoading]   = useState(true);
    const [search, setSearch]     = useState('');
    const [subTab, setSubTab]     = useState('all');
    const [sortKey, setSortKey]   = useState('national_dex');
    const [sortDir, setSortDir]   = useState('asc');
    const [typeFilter, setTypeFilter] = useState('');

    useEffect(() => {
        axios.get('/api/pokemon').then(r => {
            setPokemon(r.data);
            setLoading(false);
        });
    }, []);

    function handleSort(key) {
        if (sortKey === key) {
            setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDir(key === 'name' ? 'asc' : 'desc');
        }
    }

    const allTypes = useMemo(() => {
        const types = new Set();
        pokemon.forEach(p => { if (p.type1) types.add(p.type1); if (p.type2) types.add(p.type2); });
        return [...types].sort();
    }, [pokemon]);

    const filtered = useMemo(() => {
        let list = pokemon;

        if (subTab === 'champions') {
            list = list.filter(p => isChampionsEligible(p.name));
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(p => p.name.toLowerCase().includes(q));
        }

        if (typeFilter) {
            list = list.filter(p => p.type1 === typeFilter || p.type2 === typeFilter);
        }

        return [...list].sort((a, b) => {
            let av, bv;
            if (sortKey === 'total') {
                av = computeTotal(a); bv = computeTotal(b);
            } else if (sortKey === 'name') {
                av = a.name; bv = b.name;
            } else {
                av = a[sortKey]; bv = b[sortKey];
            }
            if (typeof av === 'string') {
                return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
            }
            return sortDir === 'asc' ? av - bv : bv - av;
        });
    }, [pokemon, subTab, search, typeFilter, sortKey, sortDir]);

    const SortIcon = ({ col }) => {
        if (sortKey !== col) return <span className="text-gray-600 ml-0.5">⇅</span>;
        return <span className="text-yellow-400 ml-0.5">{sortDir === 'asc' ? '▲' : '▼'}</span>;
    };

    const thClass = "px-3 py-3 text-xs font-bold uppercase tracking-wide cursor-pointer select-none whitespace-nowrap hover:text-yellow-300 transition-colors";
    const thCenter = thClass + " text-center";
    const thLeft   = thClass + " text-left";

    return (
        <>
            <Head title="Pokédex Rankings" />

            {/* ── Top nav ── */}
            <header className="border-b border-gray-800 bg-gray-950 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
                    <span className="text-2xl">⚔️</span>
                    <div className="flex-1">
                        <h1 className="text-lg font-bold text-white leading-tight">Pokémon Damage Calculator</h1>
                        <p className="text-xs text-gray-400">Gen IX (Scarlet / Violet) — Full competitive simulator</p>
                    </div>
                    <nav className="flex items-center gap-1">
                        <Link href="/" className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
                            Calculator
                        </Link>
                        <span className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gray-800 border border-gray-600">
                            Pokédex
                        </span>
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-extrabold text-white mb-1">Pokédex Rankings</h2>
                    <p className="text-sm text-gray-400">Sortable stats table — click any column header to sort</p>
                </div>

                {/* ── Sub-tabs ── */}
                <div className="flex gap-0 border-b border-gray-700 mb-5">
                    {SUB_TABS.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setSubTab(tab.key)}
                            className={`px-5 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                                subTab === tab.key
                                    ? 'text-white border-red-500'
                                    : 'text-gray-400 border-transparent hover:text-gray-200'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ── Filters ── */}
                <div className="flex flex-wrap gap-3 mb-5">
                    <input
                        type="text"
                        placeholder="Search by name…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 w-52"
                    />
                    <select
                        value={typeFilter}
                        onChange={e => setTypeFilter(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white text-sm focus:outline-none focus:border-red-500"
                    >
                        <option value="">All Types</option>
                        {allTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {(search || typeFilter) && (
                        <button
                            onClick={() => { setSearch(''); setTypeFilter(''); }}
                            className="px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700 transition-colors"
                        >
                            Clear
                        </button>
                    )}
                    <span className="ml-auto self-center text-sm text-gray-500">{filtered.length} Pokémon</span>
                </div>

                {/* ── Table ── */}
                {loading ? (
                    <div className="text-center py-16 text-gray-500">Loading Pokédex…</div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-gray-700">
                        <table className="w-full text-sm border-collapse">
                            <thead className="bg-gray-900 text-gray-300">
                                <tr>
                                    <th className={thCenter} onClick={() => handleSort('national_dex')}>
                                        # <SortIcon col="national_dex" />
                                    </th>
                                    <th className={thLeft} onClick={() => handleSort('name')}>
                                        Name <SortIcon col="name" />
                                    </th>
                                    <th className="px-3 py-3 text-xs font-bold uppercase tracking-wide text-center text-gray-300 whitespace-nowrap">
                                        Type
                                    </th>
                                    <th className={thCenter} onClick={() => handleSort('total')}>
                                        Total <SortIcon col="total" />
                                    </th>
                                    {STAT_KEYS.map(s => (
                                        <th key={s} className={thCenter} onClick={() => handleSort(s)}>
                                            {STAT_LABELS[s]} <SortIcon col={s} />
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((p, i) => {
                                    const total = computeTotal(p);
                                    const isChamp = isChampionsEligible(p.name);
                                    return (
                                        <tr
                                            key={p.id}
                                            className={`border-b border-gray-800 hover:bg-gray-800/60 transition-colors ${
                                                i % 2 === 0 ? 'bg-gray-900/50' : 'bg-gray-950/50'
                                            }`}
                                        >
                                            {/* # */}
                                            <td className="px-3 py-2 text-center text-gray-500 font-mono text-xs">
                                                {String(p.national_dex).padStart(4, '0')}
                                            </td>

                                            {/* Name */}
                                            <td className="px-3 py-2 min-w-[160px]">
                                                <div className="flex items-center gap-2">
                                                    {p.image_url && (
                                                        <img
                                                            src={p.image_url}
                                                            alt={p.name}
                                                            className="w-8 h-8 object-contain"
                                                            loading="lazy"
                                                        />
                                                    )}
                                                    <span className="font-semibold text-white">{p.name}</span>
                                                    {isChamp && subTab !== 'champions' && (
                                                        <span title="Champions Eligible" className="text-yellow-400 text-xs">🏆</span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Type */}
                                            <td className="px-3 py-2">
                                                <div className="flex gap-1 justify-center flex-wrap">
                                                    <TypeBadge type={p.type1} />
                                                    {p.type2 && <TypeBadge type={p.type2} />}
                                                </div>
                                            </td>

                                            {/* Total */}
                                            <td className="px-3 py-2 text-center font-bold text-white">{total}</td>

                                            {/* Stats */}
                                            {STAT_KEYS.map(s => (
                                                <td key={s} className="px-3 py-2 min-w-[100px]">
                                                    <StatBar value={p[s]} />
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </>
    );
}
