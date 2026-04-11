<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PokemonController;
use App\Http\Controllers\MoveController;
use App\Http\Controllers\CalculatorController;
use App\Http\Controllers\ItemController;

Route::get('/pokemon',    [PokemonController::class, 'index']);
Route::get('/pokemon/{id}', [PokemonController::class, 'show']);
Route::get('/moves',      [MoveController::class, 'index']);
Route::get('/items',      [ItemController::class, 'index']);
Route::post('/calculate', [CalculatorController::class, 'calculate']);
