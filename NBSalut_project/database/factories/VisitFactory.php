<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class VisitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'person_id' => User::pluck('id')->random(),
            'visit_description' => $this->faker->text(50),
            'recommendations' => $this->faker->text(20),
            'visit_date' => $this->faker->date(),
            'ss_private' => $this->faker->randomElement(['Sí', 'No'])
        ];
    }
}
