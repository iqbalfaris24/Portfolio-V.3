<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserAccount extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Iqbal Faris Akbar',
            'email' => 'iqbalfaris2002@gmail.com',
            'password' => bcrypt('password')
        ]);
    }
}
