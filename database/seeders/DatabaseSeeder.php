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
        $classes = [
            AdminSeeder::class,
            ContactInfoSeeder::class,
            PageHomeSeeder::class,
            BannerSeeder::class,
            PoliciesSeeder::class,
        ];

        foreach($classes as $class)
        {
            $this->call($class);
        }
    }
}
