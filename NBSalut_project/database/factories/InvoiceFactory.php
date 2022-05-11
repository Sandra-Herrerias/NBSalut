<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'visit_id' => $this->faker->numberBetween(1, 9000),
            'payment_type' => $this->faker->randomElement(['efectivo','tarjeta']),
            'invoice_date' => $this->faker->dateTime('now', null),
            'total_price' => $this->faker->randomFloat(2,10,100)
        ];
    }
}
