# Pokémon Damage Calculator

A full-stack competitive damage calculator for **Pokémon Scarlet & Violet (Gen IX)**, built with Laravel, React, and Inertia.js. Search any of the 1,025 Pokémon, pick a move, configure EVs/IVs/Natures, set battle conditions, and get an instant damage range with all 16 random rolls.

---

## Features

- **1,025 Pokémon** with base stats and sprites sourced from [PokémonDB](https://pokemondb.net/pokedex/all)
- **934 moves** with type, category (Physical/Special/Status), power, accuracy, PP, and effect text
- **Gen IX damage formula** — the full Bulbapedia formula including all multipliers
- **EV / IV / Nature** inputs with live effective-stat display (nature bonuses colour-coded red/blue)
- **All 16 damage rolls** shown individually (85/100 → 100/100), with KO rolls highlighted
- **Battle conditions** — weather, terrain, critical hits, burn, screens, multi-target, Glaive Rush, Adaptability, and a freeform other-modifier field
- **Type effectiveness** display (immune / not very effective / super effective) per Gen IX chart
- **Swap attacker ↔ defender** button
- **STAB highlighting** in the move search results
- Live recalculation — no submit button needed

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend framework | [Laravel 12](https://laravel.com) (PHP 8.4) |
| Frontend framework | [React 19](https://react.dev) |
| SPA adapter | [Inertia.js v3](https://inertiajs.com) — no separate API calls for page navigation |
| Build tool | [Vite 8](https://vitejs.dev) with `@vitejs/plugin-react` |
| CSS | [Tailwind CSS v4](https://tailwindcss.com) |
| Database | SQLite (zero-config, file-based) |
| HTTP client (UI) | [Axios](https://axios-http.com) |
| Data scraping | Node.js + [Cheerio](https://cheerio.js.org) |

---

## Requirements

- PHP >= 8.2
- Composer
- Node.js >= 18
- npm

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/mirfahimanwar/Pokemon-Damage-Calculator.git
cd Pokemon-Damage-Calculator
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Set up the environment file

```bash
cp .env.example .env
php artisan key:generate
```

The default `.env.example` is pre-configured to use SQLite, so no database setup is needed.

### 4. Run migrations and seed the database

This creates the SQLite database and populates it with all 1,025 Pokémon and 934 moves from the bundled JSON files in `database/data/`.

```bash
php artisan migrate:fresh --seed
```

### 5. Install JavaScript dependencies and build assets

```bash
npm install
npm run build
```

### 6. Start the development server

```bash
php artisan serve
```

Visit **http://127.0.0.1:8000** in your browser.

---

## Development Mode (hot reload)

Run Vite and Laravel simultaneously in two terminals:

```bash
# Terminal 1 — Laravel
php artisan serve

# Terminal 2 — Vite dev server with HMR
npm run dev
```

---

## Re-scraping Data (optional)

The scraped JSON files are already committed. If you want to refresh the data:

```bash
# Re-scrape Pokémon base stats and image URLs
node scripts/scrape-pokemon.mjs

# Re-scrape moves
node scripts/scrape-moves.mjs

# Re-seed the database
php artisan migrate:fresh --seed
```

---

## Project Structure

```
app/
  Http/Controllers/
    PokemonController.php     — /api/pokemon search endpoint
    MoveController.php        — /api/moves search endpoint
    CalculatorController.php  — /api/calculate damage formula (server-side)
  Models/
    Pokemon.php
    Move.php

database/
  data/
    pokemon.json              — 1,025 Pokémon (scraped, committed)
    moves.json                — 934 moves    (scraped, committed)
  migrations/
  seeders/

resources/js/
  Pages/
    Calculator.jsx            — Main calculator page
  Components/
    PokemonSearch.jsx         — Live Pokémon search with sprites
    MoveSearch.jsx            — Live move search with STAB indicator
    StatPanel.jsx             — Level / Nature / EV / IV inputs
    ConditionsPanel.jsx       — Weather, terrain, toggles
    DamageResult.jsx          — Damage range, HP bar, rolls display
    TypeBadge.jsx             — Coloured type pill
  utils/
    damage.js                 — Gen IX formula, type chart, stat calculations

scripts/
  scrape-pokemon.mjs
  scrape-moves.mjs
```

---

## Damage Formula

Implements the official **Generation IX** formula from [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Damage):

$$\text{Damage} = \left(\left(\frac{\frac{2 \times \text{Level}}{5} + 2 \times \text{Power} \times \frac{A}{D}}{50}\right) + 2\right) \times \text{Targets} \times \text{Weather} \times \text{GlaiveRush} \times \text{Critical} \times \text{random} \times \text{STAB} \times \text{Type} \times \text{Burn} \times \text{other}$$

All 16 random rolls (85–100) are computed and displayed individually.

---

## Data Sources

- Pokémon base stats & sprites: [pokemondb.net/pokedex/all](https://pokemondb.net/pokedex/all)
- Move data: [pokemondb.net/move/all](https://pokemondb.net/move/all)
- Damage formula: [Bulbapedia — Damage](https://bulbapedia.bulbagarden.net/wiki/Damage)

Pokémon and all related names are trademarks of The Pokémon Company International.
