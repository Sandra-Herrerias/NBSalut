<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Visit;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class AttachedFactory extends Factory
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
            // 'type' => $this->faker->randomElement(["image","document"]),
            // 'document' => $this->faker->sentence()
        ];
    }
}
