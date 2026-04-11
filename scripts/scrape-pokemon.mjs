/**
 * Scrapes all Pokemon base stats and image URLs from pokemondb.net/pokedex/all
 * Outputs: database/data/pokemon.json
 *
 * Run with: node scripts/scrape-pokemon.mjs
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '..', 'database', 'data', 'pokemon.json');

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function slugify(name) {
    return name
        .toLowerCase()
        .replace(/[♀]/g, '-f')
        .replace(/[♂]/g, '-m')
        .replace(/[':.\s]+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

async function scrapePokemon() {
    console.log('Fetching pokemondb.net/pokedex/all ...');

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
    };

    const response = await axios.get('https://pokemondb.net/pokedex/all', { headers, timeout: 30000 });
    const $ = cheerio.load(response.data);

    const pokemon = [];
    const seen = new Set(); // deduplicate by national dex number

    $('#pokedex tbody tr').each((_, row) => {
        const cols = $(row).find('td');
        if (cols.length < 9) return;

        const dexNum = parseInt($(cols[0]).text().trim(), 10);
        if (seen.has(dexNum)) return; // skip alternate forms
        seen.add(dexNum);

        const nameEl  = $(cols[1]).find('.ent-name');
        const name    = nameEl.text().trim();
        const slug    = slugify(name);

        // Types
        const types = [];
        $(cols[2]).find('.type-icon').each((_, el) => types.push($(el).text().trim()));

        const hp  = parseInt($(cols[4]).text().trim(), 10);
        const atk = parseInt($(cols[5]).text().trim(), 10);
        const def = parseInt($(cols[6]).text().trim(), 10);
        const spa = parseInt($(cols[7]).text().trim(), 10);
        const spd = parseInt($(cols[8]).text().trim(), 10);
        const spe = parseInt($(cols[9]).text().trim(), 10);

        pokemon.push({
            national_dex:     dexNum,
            name,
            slug,
            type1:            types[0] || 'Normal',
            type2:            types[1] || null,
            hp, attack: atk, defense: def,
            special_attack:   spa,
            special_defense:  spd,
            speed:            spe,
            image_url: `https://img.pokemondb.net/artwork/avif/large/${slug}.avif`,
        });
    });

    mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    writeFileSync(OUTPUT_PATH, JSON.stringify(pokemon, null, 2));
    console.log(`Done! Scraped ${pokemon.length} Pokemon -> ${OUTPUT_PATH}`);
}

scrapePokemon().catch(err => {
    console.error('Scrape failed:', err.message);
    process.exit(1);
});
