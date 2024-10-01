<?php

namespace Database\Seeders;

use App\Models\ContactInfo;
use Illuminate\Database\Seeder;

class ContactInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ContactInfo::create([
            'facebook' => 'https://www.facebook.com',
            'youtube' => 'https://www.youtube.com',
            'instagram' => 'https://www.instagram.com',
            'email' => 'suporte@ueek.digital',
            'phone' => '(49) 99999-9999',
            'whatsapp' => '(49) 99999-9999',
        ]);
    }
}
