<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;



/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
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
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'dni' => $this->faker->regexify('[0-9]{8}[A-Z]{1}'),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->numerify('6########'),
            'birthdate' => $this->faker->dateTime(),
            'city' => $this->faker->cityPrefix(),
            'address' => $this->faker->address(),
            'postal_code' => $this->faker->randomNumber(5, true),
            'active' => $this->faker->randomElement([true, false]),
            'previous_pathologies' => $this->faker->text(40),
            'diabetic' => $this->faker->randomElement([true, false]),
            'ss_CIP' => $this->faker->regexify('[A-Z]{4}[0-9]{10}'),
            'center_code' => $this->faker->regexify('[0-9]{10}'),
            'collegiate_num' => $this->faker->regexify('[0-9]{5}'),
            'role' => $this->faker->randomElement(['patient', 'admin', 'specialist']),
            'register_date' => $this->faker->dateTime()
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
