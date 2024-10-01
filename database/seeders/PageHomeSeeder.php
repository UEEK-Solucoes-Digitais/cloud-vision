<?php

namespace Database\Seeders;

use App\Models\PageHome;
use Illuminate\Database\Seeder;

class PageHomeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PageHome::create([
            'seo_title' => 'Projeto Base | UEEK',
            'seo_description' => 'Made with ♡',
        ]);
    }
}
