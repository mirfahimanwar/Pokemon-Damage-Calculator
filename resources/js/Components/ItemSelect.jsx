import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function ItemSelect({ value, onChange, label = 'Held Item' }) {
    const [items, setItems]   = useState([]);
    const [search, setSearch] = useState('');
    const [open, setOpen]     = useState(false);
    const ref = useRef(null);

    // Fetch all items once on mount
    useEffect(() => {
        axios.get('/api/items').then(r => setItems(r.data));
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handle = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handle);
        return () => document.removeEventListener('mousedown', handle);
    }, []);

    const filtered = search
        ? items.filter(i =>
            i.name.toLowerCase().includes(search.toLowerCase()) ||
            i.category.toLowerCase().includes(search.toLowerCase()))
        : items;

    // Group by category (preserving server order)
    const groups = [];
    const seen = {};
    for (const item of filtered) {
        if (!seen[item.category]) {
            seen[item.category] = [];
            groups.push({ cat: item.category, items: seen[item.category] });
        }
        seen[item.category].push(item);
    }

    const select = (item) => {
        onChange(item);
        setSearch('');
        setOpen(false);
    };

    return (
        <div ref={ref} className="relative">
            <label className="text-xs text-gray-400 font-medium mb-1 block">{label}</label>

            {/* Trigger button */}
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="w-full text-left px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm
                           text-white hover:border-gray-400 transition flex items-center justify-between"
            >
                <span className={value ? 'text-yellow-300 font-medium' : 'text-gray-500'}>
                    {value ? value.name : 'None'}
                </span>
                <span className="text-gray-500 text-xs ml-2">▾</span>
            </button>

            {/* Effect description under selected item */}
            {value && (
                <p className="text-xs text-gray-400 mt-1 leading-snug italic px-1">{value.effect}</p>
            )}

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg
                                shadow-2xl max-h-72 overflow-y-auto">
                    {/* Search box */}
                    <div className="sticky top-0 bg-gray-800 px-2 pt-2 pb-1.5 border-b border-gray-700">
                        <input
                            autoFocus
                            type="text"
                            placeholder="Search items…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm
                                       text-white placeholder-gray-400 outline-none focus:border-gray-400"
                        />
                    </div>

                    {/* None */}
                    <button
                        type="button"
                        onClick={() => select(null)}
                        className="w-full text-left px-3 py-2 text-gray-400 hover:bg-gray-700 text-sm
                                   border-b border-gray-700 transition"
                    >
                        None
                    </button>

                    {/* Grouped items */}
                    {groups.map(({ cat, items: catItems }) => (
                        <div key={cat}>
                            <div className="px-3 py-1 text-xs font-semibold text-gray-500 bg-gray-900/70
                                            uppercase tracking-wider">
                                {cat}
                            </div>
                            {catItems.map(item => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => select(item)}
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 transition
                                               ${value?.id === item.id
                                                   ? 'text-yellow-400 bg-gray-700/50'
                                                   : 'text-white'}`}
                                >
                                    {item.name}
                                    <span className="text-gray-500 text-xs ml-2">{item.effect}</span>
                                </button>
                            ))}
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="px-3 py-4 text-center text-gray-500 text-sm">No items found</div>
                    )}
                </div>
            )}
        </div>
    );
}
