<?php

namespace Database\Seeders;

use App\Models\Policies;
use Illuminate\Database\Seeder;

class PoliciesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Policies::create([
            'cookies_title' => 'Política de Cookies',
            'cookies_text' => 'Lorem ipsum dolor sit amet, consectetur adipiscing',
            'cookies_seo_title' => 'Política de Cookies | UEEK',
            'cookies_seo_description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing',

            'privacy_title' => 'Política de Privacidade',
            'privacy_text' => 'Lorem ipsum dolor sit amet, consectetur adipiscing',
            'privacy_seo_title' => 'Política de Privacidade | UEEK',
            'privacy_seo_description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing',

            'terms_title' => 'Termos de Uso',
            'terms_text' => 'Lorem ipsum dolor sit amet, consectetur adipiscing',
            'terms_seo_title' => 'Termos de Uso | UEEK',
            'terms_seo_description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing'
        ]);
    }
}
