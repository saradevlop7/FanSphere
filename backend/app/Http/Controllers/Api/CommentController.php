<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    public function store(Request $request, $publicationId)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:500',
        ]);

        $comment = Comment::create([
            'user_id'        => $request->user()->id,
            'publication_id' => $publicationId,
            'content'        => $validated['content'],
        ]);

        return response()->json([
            'message' => 'Commentaire ajouté avec succès',
            'comment' => $comment->load('user:id,name'),
        ], 201);
    }

    
    public function destroy(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);

        if ($comment->user_id !== $request->user()->id && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Commentaire supprimé']);
    }
}
