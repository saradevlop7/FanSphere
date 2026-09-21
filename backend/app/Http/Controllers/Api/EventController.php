<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Liste tous les événements ordonnés par date (les plus récents en premier).
     */
    public function index()
    {
        $events = Event::with('artist:id,name')
            ->orderBy('event_date', 'asc')
            ->get();

        return response()->json($events, 200);
    }

    /**
     * Création d'un nouvel événement.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'description'  => 'required|string',
            'date'         => 'required|date',
            'location'     => 'required|string|max:255',
            'ticket_price' => 'nullable|numeric|min:0',
            'ticket_url'   => 'nullable|url',
        ]);

        $user = $request->user();

        // Récupérer l'ID de l'artiste lié ou utiliser l'ID par défaut
        $artistId = $user->artist ? $user->artist->id : 1;

        $event = Event::create([
            'artist_id'    => $artistId,
            'title'        => $validated['title'],
            'description'  => $validated['description'],
            'event_date'   => $validated['date'],
            'location'     => $validated['location'],
            'ticket_price' => $validated['ticket_price'] ?? null,
            'ticket_link'  => $validated['ticket_url'] ?? null,
        ]);

        return response()->json([
            'message' => 'Événement créé avec succès',
            'event'   => $event->load('artist:id,name')
        ], 201);
    }
}
