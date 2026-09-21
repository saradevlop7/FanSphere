import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Home() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/publications')
      .then((res) => {
        setPublications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur API :', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Chargement du fil d'actualités...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-white mb-6">Fil d'actualité des artistes</h1>

      <div className="space-y-6">
        {publications.map((pub) => (
          <div key={pub.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={pub.artist?.avatar || 'https://via.placeholder.com/40'}
                alt={pub.artist?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="text-white font-semibold">{pub.artist?.name}</h3>
                <p className="text-xs text-gray-400">{pub.artist?.genre}</p>
              </div>
            </div>

            <h2 className="text-lg font-bold text-indigo-400 mb-2">{pub.title}</h2>
            <p className="text-gray-300 text-sm mb-4">{pub.content}</p>

            {pub.media_url && (
              <img
                src={pub.media_url}
                alt={pub.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}