<?php

namespace Database\Seeders;

use App\Models\Car;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        $cars = [
            [
                'brand' => 'Toyota',
                'model' => 'Corolla',
                'year' => 2020,
                'fuel_type' => 'Benzyna',
                'mileage' => 35000,
                'price' => 89900,
                'description' => 'Pierwszy właściciel, bezwypadkowy',
                'is_new' => false,
                'image' => 'toyota_corolla.jpg'
            ],
            [
                'brand' => 'BMW',
                'model' => '3 Series',
                'year' => 2022,
                'fuel_type' => 'Diesel',
                'mileage' => 15000,
                'price' => 159900,
                'description' => 'Pakiet sportowy, skórzana tapicerka',
                'is_new' => false,
                'image' => 'bmw_3.jpg'
            ],
            [
                'brand' => 'Mercedes',
                'model' => 'A Class',
                'year' => 2023,
                'fuel_type' => 'Hybryda',
                'mileage' => 0,
                'price' => 189900,
                'description' => 'Nowy model, pełne wyposażenie',
                'is_new' => true,
                'image' => 'mercedes_a.jpg'
            ],
        ];

        foreach ($cars as $car) {
            Car::create($car);
        }
    }
}