<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(10)->create();
        \App\Models\Treatment::factory(8)->create();

        \App\Models\Visit::factory(20)->create();

        // los seeders podemos borrarlos
        // \App\Models\Person::factory(15)->create();
    }
}
