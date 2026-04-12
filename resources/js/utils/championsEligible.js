// Pokémon Champions eligible Pokémon
// Source: https://web-view.app.pokemonchampions.jp/battle/pages/events/rs177501629259kmzbny/en/pokemon.html
// Matching is done against base names as stored in our DB (no regional-form suffixes).

export const CHAMPIONS_ELIGIBLE_NAMES = new Set([
    'Venusaur', 'Charizard', 'Blastoise', 'Beedrill', 'Pidgeot',
    'Arbok', 'Pikachu', 'Raichu', 'Clefable', 'Ninetales',
    'Arcanine', 'Alakazam', 'Machamp', 'Victreebel', 'Slowbro',
    'Gengar', 'Kangaskhan', 'Starmie', 'Pinsir', 'Tauros',
    'Gyarados', 'Ditto', 'Vaporeon', 'Jolteon', 'Flareon',
    'Aerodactyl', 'Snorlax', 'Dragonite',
    'Meganium', 'Typhlosion', 'Feraligatr', 'Ariados', 'Ampharos',
    'Azumarill', 'Politoed', 'Espeon', 'Umbreon', 'Slowking',
    'Forretress', 'Steelix', 'Scizor', 'Heracross', 'Skarmory',
    'Houndoom', 'Tyranitar',
    'Pelipper', 'Gardevoir', 'Sableye', 'Aggron', 'Medicham',
    'Manectric', 'Sharpedo', 'Camerupt', 'Torkoal', 'Altaria',
    'Milotic', 'Castform', 'Banette', 'Chimecho', 'Absol', 'Glalie',
    'Torterra', 'Infernape', 'Empoleon', 'Luxray', 'Roserade',
    'Rampardos', 'Bastiodon', 'Lopunny', 'Spiritomb', 'Garchomp',
    'Lucario', 'Hippowdon', 'Toxicroak', 'Abomasnow', 'Weavile',
    'Rhyperior', 'Leafeon', 'Glaceon', 'Gliscor', 'Mamoswine',
    'Gallade', 'Froslass', 'Rotom',
    'Serperior', 'Emboar', 'Samurott', 'Watchog', 'Liepard',
    'Simisage', 'Simisear', 'Simipour', 'Excadrill', 'Audino',
    'Conkeldurr', 'Whimsicott', 'Krookodile', 'Cofagrigus',
    'Garbodor', 'Zoroark', 'Reuniclus', 'Vanilluxe', 'Emolga',
    'Chandelure', 'Beartic', 'Stunfisk', 'Golurk', 'Hydreigon',
    'Volcarona',
    'Chesnaught', 'Delphox', 'Greninja', 'Diggersby', 'Talonflame',
    'Vivillon', 'Floette', 'Florges', 'Pangoro', 'Furfrou',
    'Meowstic', 'Aegislash', 'Aromatisse', 'Slurpuff', 'Clawitzer',
    'Heliolisk', 'Tyrantrum', 'Aurorus', 'Sylveon', 'Hawlucha',
    'Dedenne', 'Goodra', 'Klefki', 'Trevenant', 'Gourgeist',
    'Avalugg', 'Noivern',
    'Decidueye', 'Incineroar', 'Primarina', 'Toucannon',
    'Crabominable', 'Lycanroc', 'Toxapex', 'Mudsdale', 'Araquanid',
    'Salazzle', 'Tsareena', 'Oranguru', 'Passimian', 'Mimikyu',
    'Drampa', 'Kommo-o',
    'Corviknight', 'Flapple', 'Appletun', 'Sandaconda', 'Polteageist',
    'Hatterene', 'Mr. Rime', 'Runerigus', 'Alcremie', 'Morpeko',
    'Dragapult',
    'Wyrdeer', 'Kleavor', 'Basculegion', 'Sneasler',
    'Meowscarada', 'Skeledirge', 'Quaquaval', 'Maushold',
    'Garganacl', 'Armarouge', 'Ceruledge', 'Bellibolt', 'Scovillain',
    'Espathra', 'Tinkaton', 'Palafin', 'Orthworm', 'Glimmora',
    'Farigiraf', 'Kingambit',
    'Sinistcha', 'Archaludon', 'Hydrapple',
    'Pawmot',
]);

/** Returns true if the given Pokémon name is eligible for Pokémon Champions. */
export function isChampionsEligible(name) {
    return CHAMPIONS_ELIGIBLE_NAMES.has(name);
}
