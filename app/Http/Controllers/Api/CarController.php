<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::all();
        return response()->json($cars);
    }

    public function show(Car $car)
    {
        return response()->json($car);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'fuel_type' => 'required|string|max:255',
            'mileage' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'is_new' => 'boolean',
            'image' => 'nullable|string|max:255',
        ]);

        $car = Car::create($validated);
        
        return response()->json($car, 201);
    }

    public function update(Request $request, Car $car)
    {
        $validated = $request->validate([
            'brand' => 'sometimes|required|string|max:255',
            'model' => 'sometimes|required|string|max:255',
            'year' => 'sometimes|required|integer|min:1900|max:' . (date('Y') + 1),
            'fuel_type' => 'sometimes|required|string|max:255',
            'mileage' => 'sometimes|required|integer|min:0',
            'price' => 'sometimes|required|numeric|min:0',
            'description' => 'nullable|string',
            'is_new' => 'boolean',
            'image' => 'nullable|string|max:255',
        ]);

        $car->update($validated);
        
        return response()->json($car);
    }

    public function destroy(Car $car)
    {
        $car->delete();
        
        return response()->json(null, 204);
    }
}