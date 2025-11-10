<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// API routes (v0)
Route::prefix('api')->group(function () {
    Route::get('/health', \App\Http\Controllers\Api\HealthController::class);
    Route::get('/profile', [\App\Http\Controllers\Api\ProfileController::class, 'show']);
    Route::get('/works', [\App\Http\Controllers\Api\WorkController::class, 'index']);
});
