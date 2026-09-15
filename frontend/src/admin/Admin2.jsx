import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { PlusCircle, Image, FileText, User } from 'lucide-react';

export default function Admin() {
  const [artists, setArtists] = useState([]);
  const [artistId, setArtistId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/artists')
      .then((res) => {
        setArtists(res.data);
        if (res.data.length > 0) setArtistId(res.data[0].id);
      })
      .catch((err) => console.error('Erreur artistes :', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await api.post('/publications', {
        artist_id: artistId,
        title,
        content,
        media_url: mediaUrl,
      });

      setMessage('Publication créée avec succès !');
      setTitle('');
      setContent('');
      setMediaUrl('');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <PlusCircle className="w-8 h-8 text-indigo-500" />
          <h1 className="text-2xl font-bold text-white">Ajouter une Publication</h1>
        </div>

        {message && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-3 rounded-lg text-sm mb-6">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Artiste</label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <select
                value={artistId}
                onChange={(e) => setArtistId(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              >
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name} ({artist.genre})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Titre</label>
            <div className="relative">
              <FileText className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                placeholder="Ex: Nouveau clip vidéo disponible !"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Contenu</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="4"
              className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
              placeholder="Écrivez le message de la publication..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">URL de l'image / média (optionnel)</label>
            <div className="relative">
              <Image className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="url"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition"
          >
            Publier
          </button>
        </form>
      </div>
    </div>
  );
}