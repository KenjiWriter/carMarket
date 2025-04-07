<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CarController;

Route::middleware('api')->group(function () {
    Route::apiResource('cars', CarController::class);
});