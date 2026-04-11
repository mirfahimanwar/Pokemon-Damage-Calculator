const WEATHER_OPTIONS = [
    { value: 'none',         label: '☀️ Clear' },
    { value: 'rain',         label: '🌧️ Rain' },
    { value: 'harshsunlight',label: '🔆 Harsh Sunlight' },
    { value: 'sandstorm',    label: '🌪️ Sandstorm' },
    { value: 'snow',         label: '❄️ Snow' },
    { value: 'fog',          label: '🌫️ Fog' },
];

const TERRAIN_OPTIONS = [
    { value: 'none',     label: 'None' },
    { value: 'electric', label: '⚡ Electric Terrain' },
    { value: 'grassy',   label: '🌿 Grassy Terrain' },
    { value: 'misty',    label: '🌸 Misty Terrain' },
    { value: 'psychic',  label: '🔮 Psychic Terrain' },
];

function Toggle({ label, checked, onChange, sub }) {
    return (
        <label className="flex items-start gap-2 cursor-pointer group">
            <div className="relative mt-0.5">
                <input type="checkbox" className="sr-only peer" checked={checked} onChange={e => onChange(e.target.checked)} />
                <div className="w-9 h-5 bg-gray-700 rounded-full peer-checked:bg-red-600 transition-colors" />
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
            </div>
            <div>
                <div className="text-sm text-gray-200">{label}</div>
                {sub && <div className="text-xs text-gray-500">{sub}</div>}
            </div>
        </label>
    );
}

export default function ConditionsPanel({ conditions, setConditions }) {
    const set = (key, val) => setConditions(prev => ({ ...prev, [key]: val }));

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 space-y-5">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Battle Conditions</h3>

            {/* Weather */}
            <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase">Weather</label>
                <select
                    value={conditions.weather}
                    onChange={e => set('weather', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-red-500"
                >
                    {WEATHER_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
            </div>

            {/* Terrain */}
            <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase">Terrain</label>
                <select
                    value={conditions.terrain}
                    onChange={e => set('terrain', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-red-500"
                >
                    {TERRAIN_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
            </div>

            {/* Toggles */}
            <div className="space-y-3">
                <Toggle label="Critical Hit" sub="1.5× damage, ignores stat drops" checked={conditions.critical} onChange={v => set('critical', v)} />
                <Toggle label="STAB (Adaptability)" sub="2× instead of 1.5×" checked={conditions.adaptability} onChange={v => set('adaptability', v)} />
                <Toggle label="Burned Attacker" sub="½ physical damage" checked={conditions.burn} onChange={v => set('burn', v)} />
                <Toggle label="Multi-Target" sub="0.75× in doubles" checked={conditions.multiTarget} onChange={v => set('multiTarget', v)} />
                <Toggle label="Glaive Rush" sub="Defender used Glaive Rush" checked={conditions.glaiveRush} onChange={v => set('glaiveRush', v)} />
                <Toggle label="Screen Active" sub="Reflect / Light Screen" checked={conditions.screen} onChange={v => set('screen', v)} />
                <Toggle label="Attacker Not Grounded" sub="Ignores terrain boost" checked={!conditions.attackerGrounded} onChange={v => set('attackerGrounded', !v)} />
            </div>

            {/* Other modifier */}
            <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase">Other Modifier ×</label>
                <input
                    type="number" step="0.1" min="0.1" max="10"
                    value={conditions.otherMod}
                    onChange={e => set('otherMod', parseFloat(e.target.value) || 1)}
                    className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-red-500"
                />
            </div>
        </div>
    );
}
