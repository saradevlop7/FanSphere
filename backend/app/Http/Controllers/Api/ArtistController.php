<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Artist;
use Illuminate\Http\Request;

class ArtistController extends Controller
{
    public function index()
    {
        return response()->json(Artist::withCount(['posts', 'events'])->get());
    }

    public function show($id)
    {
        $artist = Artist::with(['posts', 'events'])->find($id);
        if (!$artist) return response()->json(['message' => 'Artiste introuvable'], 404);
        return response()->json($artist);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'  => 'required|string',
            'genre' => 'required|string',
            'bio'   => 'nullable|string',
        ]);

        $artist = Artist::create($validated);
        return response()->json($artist, 201);
    }

    public function destroy($id)
    {
        Artist::destroy($id);
        return response()->json(['message' => 'Artiste supprimé']);
    }
}
