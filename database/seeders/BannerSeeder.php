<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Banner::create([
            'title' => 'Conheça a UEEK',
            'description' => 'Projeto base UEEK Soluções Digitais',
            'image' => '',
            'image_webp' => '',
            'image_mobile' => '',
            'image_mobile_webp' => '',
            'btn_text' => 'Conheça mais',
            'btn_link' => 'https://ueek.digital',
            'position' => -1,
            'status' => 1,
        ]);
    }
}
