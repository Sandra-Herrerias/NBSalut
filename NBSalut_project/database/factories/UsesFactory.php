<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Treatment;
use App\Models\User;
use App\Models\Visit;

/**
 * 
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class UsesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'visit_id' => Visit::pluck('id')->random(),
            'user_id' => User::pluck('id')->random(),
            'treatment_id' => Treatment::pluck('id')->random()
        ];
    }
}
