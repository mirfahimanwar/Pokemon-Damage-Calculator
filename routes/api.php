<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PokemonController;
use App\Http\Controllers\MoveController;
use App\Http\Controllers\CalculatorController;

Route::get('/pokemon',    [PokemonController::class, 'index']);
Route::get('/pokemon/{id}', [PokemonController::class, 'show']);
Route::get('/moves',      [MoveController::class, 'index']);
Route::post('/calculate', [CalculatorController::class, 'calculate']);
