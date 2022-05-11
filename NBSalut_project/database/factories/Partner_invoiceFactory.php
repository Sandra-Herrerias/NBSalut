<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Partner_invoice>
 */
class Partner_invoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'phone' => $this->faker->sentence(),
            'dni' => $this->faker->sentence(),
            'collegiate_num' => $this->faker->sentence(),
            'first_name' => $this->faker->sentence(),
            'last_name' => $this->faker->sentence(),
            'role' => $this->faker->randomElement(['admin','specialist']),
            'nif' => $this->faker->sentence(),
            'postal_code' => $this->faker->sentence(),
            'address' => $this->faker->sentence(),
            'city' => $this->faker->sentence()
           
        ];
    }
}
