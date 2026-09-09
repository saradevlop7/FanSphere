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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    
    public function publications()
    {
        return $this->hasMany(Publication::class);
    }


    public function events()
    {
        return $this->hasMany(Event::class);
    }


    public function followers()
    {
        return $this->belongsToMany(User::class, 'artist_user', 'artist_id', 'user_id')->withTimestamps();
    }
}
