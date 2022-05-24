<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Treatment>
 */
class TreatmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->unique(true)->randomElement([
                'QUIROPODOLOGIA', 'CURAS', 'TRATAMIENTO VERRUGAS', 'REEDUCACIÓN UNGUEAL', 'PROTESIS PEQUEÑAS', 'PROTESIS MEDIANA', 'PROTESIS GRANDE', 'SILMA', 'VENDAJE NEUROMUSCULAR', 'CIRUGÍA DE LA UÑA', 'ESTUDIO BIOMECANICO', 'ESTUDIO BIOMECÁNICO + SP ADULTO', 'ESTUDIO BIOMECÁNICO + SP INFANTIL', 'RETOQUES O CAMBIO FORROS SP', 'OTRAS PRUEBAS',
            ]),
            'price' => $this->faker->randomFloat(2, 10, 100),
            'description' => $this->faker->text(50),
            'active' => $this->faker->randomElement([true, false])
        ];
    }
}
