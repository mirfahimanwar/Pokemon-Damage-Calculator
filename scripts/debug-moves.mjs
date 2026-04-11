/**
 * Debug: inspect moves page HTML structure
 */
import axios from 'axios';
import * as cheerio from 'cheerio';

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
};
const response = await axios.get('https://pokemondb.net/move/all', { headers, timeout: 30000 });
const $ = cheerio.load(response.data);

// Find all table-related elements
const tables = $('table');
console.log('Number of tables:', tables.length);
tables.each((i, t) => {
    console.log(`Table ${i}: id="${$(t).attr('id')}" class="${$(t).attr('class')}"`);
    const rows = $(t).find('tbody tr');
    console.log(`  Rows: ${rows.length}`);
    if (rows.length > 0) {
        const firstRow = rows.first();
        const cols = firstRow.find('td');
        console.log(`  First row cols: ${cols.length}`);
        cols.each((j, c) => {
            console.log(`    col[${j}]: "${$(c).text().trim().substring(0, 50)}"`);
        });
    }
});
