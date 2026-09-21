<?php

namespace App\Models;

use App\models\Comment;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    use HasFactory;

    protected $fillable = [
        'artist_id',
        'title',
        'content',
        'media_url',
        'type',
    ];

    /**
     * Une publication appartient à un artiste.
     */
    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }

    /**
     * Une publication possède plusieurs commentaires.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
