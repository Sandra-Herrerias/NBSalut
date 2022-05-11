<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Person>
 */
class PersonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'first_name' => $this->faker->firstName('es_ES'),
            'last_name' => $this->faker->lastName('es_ES'),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'dni' => $this->faker->regexify('[A-Z]{1}[0-9]{8}'),    
            'phone' => $this->faker->regexify('##########'),
            'birthdate' => $this->faker->dateTime(),
            'city' => $this->faker->cityPrefix(),
            'address' => $this->faker->address(),
            'postal_code' => $this->faker->regexify('#####'),
            'active' => $this->faker->randomElement([true,false]),
            'previous_pathologies'     => $this->faker->text(40),        
            'diabetic' => $this->faker->randomElement([true,false]),


            // $table->string('ss_CIP')->nullable();; // Patient
            // $table->string('center_code')->nullable(); // Patient
            // $table->string('num_clinical_log')->nullable(); // Patient
 
            // $table->string('collegiate_num')->nullable(); // Specialist
            // $table->enum('role', ['admin', 'specialist'])->nullable();

        ];
    }
}
