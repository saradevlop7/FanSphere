<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'genre',
        'bio',
        'avatar',
        'cover_image',
    ];

    /**
     * Un artiste appartient à un utilisateur (si lié à un compte).
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Un artiste possède plusieurs publications.
     */
    public function publications()
    {
        return $this->hasMany(Publication::class);
    }

    /**
     * Un artiste possède plusieurs événements.
     */
    public function events()
    {
        return $this->hasMany(Event::class);
    }

    /**
     * Les fans qui suivent cet artiste (relation Many-to-Many).
     */
    public function followers()
    {
        return $this->belongsToMany(User::class, 'artist_user', 'artist_id', 'user_id')->withTimestamps();
    }
}
