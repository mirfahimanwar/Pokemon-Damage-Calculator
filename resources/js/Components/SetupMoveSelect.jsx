// Common setup / stat-changing moves grouped by who benefits / is penalised.
// `self` = changes applied to the user's stages (attacker or defender).
// `foe`  = changes applied to the opposing side's stages.

const NONE = { label: '— None —', self: {}, foe: {} };

const SETUP_MOVES = [
    // ── Attacker self-boosts ──────────────────────────────────────────
    { label: 'Swords Dance (+2 Atk)',              self: { atk:  2 }, foe: {} },
    { label: 'Nasty Plot (+2 SpA)',                self: { spa:  2 }, foe: {} },
    { label: 'Dragon Dance (+1 Atk +1 Spe)',       self: { atk:  1, spe:  1 }, foe: {} },
    { label: 'Calm Mind (+1 SpA +1 SpD)',          self: { spa:  1, spd:  1 }, foe: {} },
    { label: 'Quiver Dance (+1 SpA +1 SpD +1 Spe)',self: { spa:  1, spd:  1, spe:  1 }, foe: {} },
    { label: 'Bulk Up (+1 Atk +1 Def)',            self: { atk:  1, def:  1 }, foe: {} },
    { label: 'Agility / Rock Polish (+2 Spe)',     self: { spe:  2 }, foe: {} },
    { label: 'Shift Gear (+1 Atk +2 Spe)',         self: { atk:  1, spe:  2 }, foe: {} },
    { label: 'Coil (+1 Atk +1 Def)',               self: { atk:  1, def:  1 }, foe: {} },
    { label: 'Work Up (+1 Atk +1 SpA)',            self: { atk:  1, spa:  1 }, foe: {} },
    { label: 'Hone Claws (+1 Atk)',                self: { atk:  1 }, foe: {} },
    { label: 'Flame Charge (+1 Spe)',              self: { spe:  1 }, foe: {} },
    { label: 'Shell Smash (+2 Atk +2 SpA +2 Spe −1 Def −1 SpD)',
                                                   self: { atk:  2, spa:  2, spe:  2, def: -1, spd: -1 }, foe: {} },
    { label: 'Fillet Away (+2 Atk +2 SpA +2 Spe)', self: { atk:  2, spa:  2, spe:  2 }, foe: {} },
    { label: 'Geomancy (+2 SpA +2 SpD +2 Spe)',   self: { spa:  2, spd:  2, spe:  2 }, foe: {} },
    { label: 'Curse / non-Ghost (+1 Atk +1 Def −1 Spe)',
                                                   self: { atk:  1, def:  1, spe: -1 }, foe: {} },
    { label: 'Iron Defense (+2 Def)',              self: { def:  2 }, foe: {} },
    { label: 'Cotton Guard (+3 Def)',              self: { def:  3 }, foe: {} },
    { label: 'Amnesia (+2 SpD)',                   self: { spd:  2 }, foe: {} },
    { label: 'Cosmic Power (+1 Def +1 SpD)',       self: { def:  1, spd:  1 }, foe: {} },
    { label: 'Belly Drum (+6 Atk)',                self: { atk:  6 }, foe: {} },
    { label: 'Tidy Up (+1 Atk +1 Spe)',            self: { atk:  1, spe:  1 }, foe: {} },
    { label: 'Victory Dance (+1 Atk +1 Def +1 Spe)',self: { atk: 1, def: 1, spe: 1 }, foe: {} },
    { label: 'No Retreat (+1 Atk +1 Def +1 SpA +1 SpD +1 Spe)',
                                                   self: { atk:  1, def:  1, spa:  1, spd:  1, spe:  1 }, foe: {} },
    { label: 'Clangorous Soul (+1 all)',           self: { atk:  1, def:  1, spa:  1, spd:  1, spe:  1 }, foe: {} },
    // ── Opponent-lowering (foe) ───────────────────────────────────────
    { label: 'Screech (foe −2 Def)',               self: {}, foe: { def: -2 } },
    { label: 'Leer (foe −1 Def)',                  self: {}, foe: { def: -1 } },
    { label: 'Tail Whip (foe −1 Def)',             self: {}, foe: { def: -1 } },
    { label: 'Charm (foe −2 Atk)',                 self: {}, foe: { atk: -2 } },
    { label: 'Growl (foe −1 Atk)',                 self: {}, foe: { atk: -1 } },
    { label: "Baby-Doll Eyes (foe −1 Atk)",        self: {}, foe: { atk: -1 } },
    { label: 'Fake Tears (foe −2 SpD)',            self: {}, foe: { spd: -2 } },
    { label: 'Metal Sound (foe −2 SpD)',           self: {}, foe: { spd: -2 } },
    { label: 'Eerie Impulse (foe −2 SpA)',         self: {}, foe: { spa: -2 } },
    { label: 'Snarl (foe −1 SpA)',                 self: {}, foe: { spa: -1 } },
    { label: 'Scary Face (foe −2 Spe)',            self: {}, foe: { spe: -2 } },
    { label: 'Tickle (foe −1 Atk −1 Def)',        self: {}, foe: { atk: -1, def: -1 } },
    { label: 'Acid / Acid Spray (foe −1/−2 SpD)', self: {}, foe: { spd: -1 } },
    { label: 'Parting Shot (foe −1 Atk −1 SpA)',  self: {}, foe: { atk: -1, spa: -1 } },
    { label: 'Memento (foe −2 Atk −2 SpA)',       self: {}, foe: { atk: -2, spa: -2 } },
];

// Merge delta stages into existing stages (clamp −6 to +6)
function mergeStages(current, delta) {
    const next = { ...current };
    for (const [k, v] of Object.entries(delta)) {
        next[k] = Math.max(-6, Math.min(6, (next[k] ?? 0) + v));
    }
    return next;
}

import { useState } from 'react';

const CLEAR_STAGES = { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };

export default function SetupMoveSelect({ atkStages, setAtkStages, defStages, setDefStages }) {
    const [selectedIdx, setSelectedIdx] = useState('');

    function apply(idx) {
        const move = SETUP_MOVES[parseInt(idx)];
        if (!move) {
            // "None" selected — clear everything
            setAtkStages({ ...CLEAR_STAGES });
            setDefStages({ ...CLEAR_STAGES });
            setSelectedIdx('');
            return;
        }
        // Reset all stages first, then apply only this move's effect
        const newAtk = mergeStages({ ...CLEAR_STAGES }, move.self);
        const newDef = mergeStages({ ...CLEAR_STAGES }, move.foe);
        setAtkStages(newAtk);
        setDefStages(newDef);
        setSelectedIdx(idx);
    }

    function reset() {
        setAtkStages({ ...CLEAR_STAGES });
        setDefStages({ ...CLEAR_STAGES });
        setSelectedIdx('');
    }

    return (
        <div className="pt-2 border-t border-gray-700 space-y-2">
            <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Setup Move</label>
                {selectedIdx !== '' && (
                    <button
                        type="button"
                        onClick={reset}
                        className="text-xs text-gray-500 hover:text-red-400 underline ml-auto"
                    >
                        Clear
                    </button>
                )}
            </div>
            <select
                value={selectedIdx}
                onChange={e => apply(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm
                           focus:outline-none focus:border-red-500"
            >
                <option value="">— None (no setup) —</option>
                {SETUP_MOVES.map((m, i) => (
                    <option key={i} value={i}>{m.label}</option>
                ))}
            </select>
        </div>
    );
}
