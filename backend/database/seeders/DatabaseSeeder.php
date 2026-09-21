<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Artist;
use App\Models\Publication;
use App\Models\Event;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Création des utilisateurs
        $admin = User::create([
            'name' => 'Admin FanSphere',
            'email' => 'admin@fansphere.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        $fan = User::create([
            'name' => 'Alex Dupont',
            'email' => 'alex@gmail.com',
            'password' => Hash::make('password123'),
            'role' => 'fan',
        ]);

        // 2. Création des Artistes
        $luna = Artist::create([
            'name' => 'Luna Echo',
            'genre' => 'Indie / Electronic',
            'bio' => 'Artiste indie expérimentale combinant des rythmes synthwave et des mélodies mélancoliques.',
            'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500',
            'cover_image' => 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200',
        ]);

        $theVintage = Artist::create([
            'name' => 'The Vintage',
            'genre' => 'Rock / Blues',
            'bio' => 'Groupe de rock classique revisitant les sonorités vintage des années 70.',
            'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500',
            'cover_image' => 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1200',
        ]);

        // 3. Création des Publications
        Publication::create([
            'artist_id' => $luna->id,
            'title' => 'Nouveau Single : Sound Waves in Venice',
            'content' => 'Découvrez en avant-première mon tout nouveau morceau extrait du futur album !',
            'media_url' => 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800',
        ]);

        Publication::create([
            'artist_id' => $theVintage->id,
            'title' => 'Enregistrement du nouvel album en studio',
            'content' => 'Session studio intense cette semaine. On vous prépare du très lourd !',
            'media_url' => 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800',
        ]);

        // 4. Création des Événements
        Event::create([
            'artist_id' => $luna->id,
            'title' => 'Synthwave Festival 2026',
            'event_date' => '2026-10-15 20:00:00',
            'location' => 'L\'Olympia, Paris',
            'price' => 45.00,
            'image' => 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800',
        ]);

        Event::create([
            'artist_id' => $theVintage->id,
            'title' => 'Acoustic Tour - Concert Privé',
            'event_date' => '2026-11-02 21:00:00',
            'location' => 'Le Zenith, Lyon',
            'price' => 35.00,
            'image' => 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800',
        ]);
    }
}
