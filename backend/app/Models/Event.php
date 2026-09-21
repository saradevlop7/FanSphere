<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'artist_id',
        'title',
        'description',
        'location',
        'event_date',
        'ticket_price',
        'ticket_link',
    ];

    protected $casts = [
        'event_date' => 'datetime',
        'ticket_price' => 'decimal:2',
    ];

    /**
     * Un événement appartient à un artiste.
     */
    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }
}
