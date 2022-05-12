<?php

namespace Database\Factories;

use App\Models\Invoice;
use App\Models\Treatment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice_detail>
 */
class Invoice_detailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'price' => $this->faker->randomFloat(2,10,100),
            'quantity' => $this->faker->numberBetween(1, 9000),
            'total' => $this->faker->randomFloat(2,10,100),
            'treatment_id' => Treatment::pluck('id')->random(),
            'invoice_id' => Invoice::pluck('id')->random()
        ];
    }
}
