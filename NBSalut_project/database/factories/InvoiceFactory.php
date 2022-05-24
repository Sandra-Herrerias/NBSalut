<?php

namespace Database\Factories;

use App\Models\Visit;
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
            'payment_type' => $this->faker->randomElement(['efectivo', 'tarjeta']),
            'invoice_date' => $this->faker->dateTimeBetween('-9 month', 'now'),
            'total_price' => $this->faker->randomFloat(2, 10, 100),
            'sent' => $this->faker->randomElement([true,false]),
            'visit_id' => Visit::pluck('id')->random()
        ];
    }
}
