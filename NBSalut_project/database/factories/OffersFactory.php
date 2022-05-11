<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Person;
use App\Models\Treatment;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Offer>
 */
class OffersFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'person_id' => Person::pluck('id')->random(),
            'treatment_id' => Treatment::pluck('id')->random()
        ];
    }
}
