<?php

namespace Database\Factories;

use App\Models\Invoice;
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
            'phone' => $this->faker->numerify('6########'),
            'dni' => $this->faker->regexify('[0-9]{8}[A-Z]{1}'),
            'collegiate_num' => $this->faker->numerify('#####'),
            'first_name' => $this->faker->firstName('es_ES'),
            'last_name' => $this->faker->lastName('es_ES'),
            'role' => $this->faker->randomElement(['specialist', 'patient']),
            'nif' =>  $this->faker->regexify('[0-9]{8}[A-Z]{1}'),
            'postal_code' => $this->faker->randomNumber(5, true),
            'address' => $this->faker->address(),
            'city' => $this->faker->cityPrefix(),
            'invoice_id' => Invoice::pluck('id')->random()

        ];
    }
}
