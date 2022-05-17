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
        \App\Models\User::factory(15)->create();
        \App\Models\Treatment::factory(15)->create();
        \App\Models\Visit::factory(15)->create();
        \App\Models\Invoice::factory(35)->create();
        \App\Models\Invoice_detail::factory(15)->create();
        \App\Models\Partner_invoice::factory(5)->create();
        \App\Models\Offer::factory(15)->create();
        \App\Models\Uses::factory(15)->create();
        \App\Models\Attached::factory(15)->create();
    }
}
