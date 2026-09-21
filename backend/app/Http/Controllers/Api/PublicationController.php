<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Publication;
use Illuminate\Http\Request;

class PublicationController extends Controller
{
    public function index()
    {
        return response()->json(Publication::with('artist', 'comments.user')->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'artist_id' => 'required|exists:artists,id',
            'title'     => 'required|string',
            'content'   => 'required|string',
            'media_url' => 'nullable|string',
        ]);

        $publication = Publication::create($validated);
        return response()->json($publication, 201);
    }

    public function show($id)
    {
        $publication = Publication::with('artist', 'comments.user')->find($id);
        if (!$publication) {
            return response()->json(['message' => 'Publication introuvable'], 404);
        }
        return response()->json($publication);
    }

    public function destroy($id)
    {
        Publication::destroy($id);
        return response()->json(['message' => 'Publication supprimée']);
    }
}


