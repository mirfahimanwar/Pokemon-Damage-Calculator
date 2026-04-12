<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Calculator');
});

Route::get('/pokedex', function () {
    return Inertia::render('Pokedex');
});

