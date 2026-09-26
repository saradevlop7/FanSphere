<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Disable Foreign Key checks to clear tables safely
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        User::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Password standard l kolshi: 12345678
        $defaultPassword = Hash::make('12345678');

        // 1. Compte Admin
        User::create([
            'name' => 'Admin FanSphere',
            'email' => 'admin@fansphere.com',
            'password' => $defaultPassword,
            'role' => 'admin',
        ]);

        // 2. Comptes Artistes
        User::create([
            'name' => 'Aurora Synth',
            'email' => 'aurora@fansphere.com',
            'password' => $defaultPassword,
            'role' => 'artist',
        ]);

        User::create([
            'name' => 'The Nomads',
            'email' => 'nomads@fansphere.com',
            'password' => $defaultPassword,
            'role' => 'artist',
        ]);

        User::create([
            'name' => 'DJ Nova',
            'email' => 'djnova@fansphere.com',
            'password' => $defaultPassword,
            'role' => 'artist',
        ]);

        // 3. Comptes Users / Fans
        User::create([
            'name' => 'Sara Charafi',
            'email' => 'saracharafi018@gmail.com',
            'password' => $defaultPassword,
            'role' => 'user',
        ]);

        User::create([
            'name' => 'John Doe',
            'email' => 'john@gmail.com',
            'password' => $defaultPassword,
            'role' => 'user',
        ]);
    }
}
