<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Person;


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
            'person_id' => Person::pluck('id')->random(),
            'id' => id(),
            'visit_description' => $this->faker->text(),
            'recommendations' => $this->faker->text(),
            'visit_date' => $this->faker->date(),
            'ss_private' => $this->faker->text()
        ];
    }
}
