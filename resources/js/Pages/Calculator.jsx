import { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import PokemonSearch from '../Components/PokemonSearch';
import StatPanel from '../Components/StatPanel';
import MoveSearch from '../Components/MoveSearch';
import ConditionsPanel from '../Components/ConditionsPanel';
import DamageResult from '../Components/DamageResult';
import KoListPanel from '../Components/KoListPanel';
import TypeCoveragePanel from '../Components/TypeCoveragePanel';
import TypeDefensePanel from '../Components/TypeDefensePanel';
import ItemSelect from '../Components/ItemSelect';
import SetupMoveSelect from '../Components/SetupMoveSelect';
import { calculateDamage } from '../utils/damage';

const DEFAULT_IVS = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 };
const DEFAULT_EVS = { hp: 0,  atk: 0,  def: 0,  spa: 0,  spd: 0,  spe: 0  };
const DEFAULT_CONDITIONS = {
    weather: 'none', terrain: 'none',
    critical: false, adaptability: false, burn: false,
    multiTarget: false, glaiveRush: false, screen: false,
    attackerGrounded: true, otherMod: 1,
};

export default function Calculator() {
    // Attacker state
    const [attacker, setAttacker]         = useState(null);
    const [atkLevel, setAtkLevel]         = useState(50);
    const [atkIvs, setAtkIvs]             = useState({ ...DEFAULT_IVS });
    const [atkEvs, setAtkEvs]             = useState({ ...DEFAULT_EVS });
    const [atkNature, setAtkNature]       = useState('Hardy');
    const [attackerItem, setAttackerItem] = useState(null);
    const [atkStages, setAtkStages]       = useState({ atk:0, def:0, spa:0, spd:0, spe:0 });

    // Defender state
    const [defender, setDefender]         = useState(null);
    const [defLevel, setDefLevel]         = useState(50);
    const [defIvs, setDefIvs]             = useState({ ...DEFAULT_IVS });
    const [defEvs, setDefEvs]             = useState({ ...DEFAULT_EVS });
    const [defNature, setDefNature]       = useState('Hardy');
    const [defenderItem, setDefenderItem] = useState(null);
    const [defStages, setDefStages]       = useState({ atk:0, def:0, spa:0, spd:0, spe:0 });

    // Move state
    const [move, setMove]                 = useState(null);

    // Conditions
    const [conditions, setConditions]     = useState({ ...DEFAULT_CONDITIONS });

    // Event filter
    const [championsOnly, setChampionsOnly] = useState(false);

    // Compute result live
    const result = useMemo(() => {
        if (!attacker || !defender || !move || !move.power) return null;
        try {
            return calculateDamage({
                attacker, attackerIvs: atkIvs, attackerEvs: atkEvs,
                attackerNature: atkNature, attackerLevel: atkLevel,
                attackerItem, attackerStages: atkStages,
                defender, defenderIvs: defIvs, defenderEvs: defEvs,
                defenderNature: defNature, defenderLevel: defLevel,
                defenderItem, defenderStages: defStages,
                move, conditions,
            });
        } catch {
            return null;
        }
    }, [attacker, atkIvs, atkEvs, atkNature, atkLevel, attackerItem, atkStages,
        defender, defIvs, defEvs, defNature, defLevel, defenderItem, defStages,
        move, conditions]);

    const attackerTypes = attacker ? [attacker.type1, attacker.type2] : null;

    return (
        <>
            <Head title="Calculator" />

            {/* Header */}
            <header className="border-b border-gray-800 bg-gray-950 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
                    <span className="text-2xl">⚔️</span>
                    <div className="flex-1">
                        <h1 className="text-lg font-bold text-white leading-tight">Pokémon Damage Calculator</h1>
                        <p className="text-xs text-gray-400">Gen IX (Scarlet / Violet) — Full competitive simulator</p>
                    </div>
                    <nav className="flex items-center gap-1">
                        <span className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gray-800 border border-gray-600">
                            Calculator
                        </span>
                        <Link href="/pokedex" className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
                            Pokédex
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* ───── Attacker ───── */}
                    <div className="space-y-5">
                        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 space-y-5">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                            <h2 className="text-base font-bold text-white">Attacker</h2>
                        </div>
                        <PokemonSearch label="Pokémon" value={attacker} onChange={setAttacker}
                            championsOnly={championsOnly} />
                        <StatPanel
                            pokemon={attacker}
                            level={atkLevel} setLevel={setAtkLevel}
                            ivs={atkIvs}    setIvs={setAtkIvs}
                            evs={atkEvs}    setEvs={setAtkEvs}
                            nature={atkNature} setNature={setAtkNature}
                            stages={atkStages} setStages={setAtkStages}
                        />

                        <ItemSelect
                            label="Held Item"
                            value={attackerItem}
                            onChange={setAttackerItem}
                            championsOnly={championsOnly}
                        />

                        {/* Move selector (attacker side) */}
                        <div className="pt-2 border-t border-gray-700">
                            <MoveSearch value={move} onChange={setMove} attackerTypes={attackerTypes} />
                        </div>

                        <SetupMoveSelect
                            atkStages={atkStages} setAtkStages={setAtkStages}
                            defStages={defStages} setDefStages={setDefStages}
                        />
                        </div>

                        {/* Type coverage chart */}
                        <TypeCoveragePanel move={move} />
                    </div>

                    {/* ───── Center: Result + Conditions ───── */}
                    <div className="space-y-5">
                        {/* Swap button */}
                        <div className="flex justify-center">
                            <button
                                onClick={() => {
                                    const tmp = attacker;
                                    setAttacker(defender); setDefender(tmp);
                                    const tmpL = atkLevel; setAtkLevel(defLevel); setDefLevel(tmpL);
                                    const tmpI = atkIvs; setAtkIvs(defIvs); setDefIvs(tmpI);
                                    const tmpE = atkEvs; setAtkEvs(defEvs); setDefEvs(tmpE);
                                    const tmpN = atkNature; setAtkNature(defNature); setDefNature(tmpN);
                                    const tmpItem = attackerItem; setAttackerItem(defenderItem); setDefenderItem(tmpItem);
                                    const tmpStages = atkStages; setAtkStages(defStages); setDefStages(tmpStages);
                                }}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium
                                           transition flex items-center gap-2"
                            >
                                ⇅ Swap Attacker / Defender
                            </button>
                        </div>

                        {/* Champions eligibility filter */}
                        <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition select-none
                                          ${ championsOnly
                                              ? 'bg-yellow-950/60 border-yellow-500/70'
                                              : 'bg-gray-800 border-gray-700 hover:border-yellow-600/50' }`}>
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={championsOnly}
                                onChange={e => setChampionsOnly(e.target.checked)}
                            />
                            {/* Custom checkbox */}
                            <div className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition
                                            ${ championsOnly
                                                ? 'bg-yellow-500 border-yellow-400'
                                                : 'border-gray-500 bg-gray-700' }`}>
                                {championsOnly && (
                                    <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 12 12">
                                        <path d="M10 3L5 9 2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                                    </svg>
                                )}
                            </div>
                            <div className="min-w-0">
                                <div className={`text-sm font-semibold ${ championsOnly ? 'text-yellow-300' : 'text-gray-300' }`}>
                                    🏆 Pokémon Champions Eligible
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                    Limit to {championsOnly ? 'eligible Pokémon only' : 'all 1,025 Pokémon'}
                                </div>
                            </div>
                        </label>

                        {/* Damage result */}
                        {result ? (
                            <DamageResult result={result} move={move} />
                        ) : (
                            <div className="bg-gray-800 border border-dashed border-gray-600 rounded-xl p-8 text-center text-gray-500">
                                <div className="text-4xl mb-2">⚡</div>
                                <p className="text-sm">Select a Pokémon on each side and a damaging move to see results.</p>
                                {(!move || !move.power) && move && (
                                    <p className="text-xs text-orange-400 mt-2">Status moves don't deal damage.</p>
                                )}
                            </div>
                        )}

                        <ConditionsPanel conditions={conditions} setConditions={setConditions} />
                    </div>

                    {/* ───── Defender + Type Defense + KO List ───── */}
                    <div className="space-y-5">
                        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 space-y-5">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                                <h2 className="text-base font-bold text-white">Defender</h2>
                            </div>
                            <PokemonSearch label="Pokémon" value={defender} onChange={setDefender}
                                championsOnly={championsOnly} />
                            <StatPanel
                                pokemon={defender}
                                level={defLevel} setLevel={setDefLevel}
                                ivs={defIvs}    setIvs={setDefIvs}
                                evs={defEvs}    setEvs={setDefEvs}
                                nature={defNature} setNature={setDefNature}
                                stages={defStages} setStages={setDefStages}
                            />

                            <ItemSelect
                                label="Held Item"
                                value={defenderItem}
                                onChange={setDefenderItem}
                                championsOnly={championsOnly}
                            />
                        </div>

                        <KoListPanel
                            attacker={attacker}
                            attackerIvs={atkIvs}
                            attackerEvs={atkEvs}
                            attackerNature={atkNature}
                            attackerLevel={atkLevel}
                            attackerItem={attackerItem}
                            championsOnly={championsOnly}
                            move={move}
                            conditions={conditions}
                            onSelect={(pokemon, evs, ivs, nature) => {
                                setDefender(pokemon);
                                setDefEvs({ ...evs });
                                setDefIvs({ ...ivs });
                                setDefNature(nature);
                            }}
                            selectedDefenderId={defender?.id}
                        />

                        {/* Type defense chart */}
                        <TypeDefensePanel defender={defender} />
                    </div>

                </div>
            </main>

            <footer className="border-t border-gray-800 mt-10 py-4 text-center text-xs text-gray-600">
                Pokémon and all related names are trademarks of The Pokémon Company · Data from pokemondb.net
            </footer>
        </>
    );
}
