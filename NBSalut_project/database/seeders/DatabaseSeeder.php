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
        \App\Models\User::factory(100)->create();
        \App\Models\Treatment::factory(100)->create();
        \App\Models\Visit::factory(100)->create();
        \App\Models\Invoice::factory(100)->create();
        \App\Models\Invoice_detail::factory(100)->create();
        \App\Models\Partner_invoice::factory(5)->create();
        // \App\Models\Offer::factory(100)->create();
        \App\Models\Uses::factory(100)->create();
        \App\Models\Attached::factory(100)->create();
    }
}
