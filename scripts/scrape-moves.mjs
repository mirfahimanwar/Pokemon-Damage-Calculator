/**
 * Scrapes all Pokemon moves from pokemondb.net/move/all
 * Outputs: database/data/moves.json
 *
 * Run with: node scripts/scrape-moves.mjs
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '..', 'database', 'data', 'moves.json');

function slugify(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function parseNum(str) {
    const n = parseInt(str.trim().replace(/[^0-9]/g, ''), 10);
    return isNaN(n) ? null : n;
}

async function scrapeMoves() {
    console.log('Fetching pokemondb.net/move/all ...');

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
    };

    const response = await axios.get('https://pokemondb.net/move/all', { headers, timeout: 30000 });
    const $ = cheerio.load(response.data);

    const moves = [];
    const seen = new Set();

    // The moves table has id="moves"
    $('#moves tbody tr').each((_, row) => {
        const cols = $(row).find('td');
        if (cols.length < 8) return;

        const name = $(cols[0]).find('a').first().text().trim() || $(cols[0]).text().trim();
        if (!name) return;
        const slug = slugify(name);
        if (seen.has(slug)) return;
        seen.add(slug);

        const type = $(cols[1]).text().trim();

        // Category is stored as an img with alt attribute
        const catImg = $(cols[2]).find('img');
        const categoryRaw = catImg.attr('alt') || catImg.attr('title') || $(cols[2]).text().trim();
        let cat = 'Status';
        if (/physical/i.test(categoryRaw)) cat = 'Physical';
        else if (/special/i.test(categoryRaw)) cat = 'Special';

        const power    = parseNum($(cols[3]).text());
        const accuracy = parseNum($(cols[4]).text());
        const pp       = parseNum($(cols[5]).text());
        const effect   = $(cols[6]).text().trim() || null;
        const prob     = parseNum($(cols[7]).text());

        moves.push({
            name,
            slug,
            type,
            category: cat,
            power,
            accuracy,
            pp,
            effect,
            probability: prob,
        });
    });

    mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    writeFileSync(OUTPUT_PATH, JSON.stringify(moves, null, 2));
    console.log(`Done! Scraped ${moves.length} moves -> ${OUTPUT_PATH}`);
}

scrapeMoves().catch(err => {
    console.error('Scrape failed:', err.message);
    process.exit(1);
});
