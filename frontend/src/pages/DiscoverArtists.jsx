
import React, { useState, useEffect } from 'react';
import { Search, Music, Check, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const INITIAL_ARTISTS = [
  {
    id: 1,
    name: 'Luna Echo',
    genre: 'Pop',
    description:
      "Rising pop sensation blending synth-wave beats with ethereal vocals. Currently on the 'Neon Dreams' tour.",
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    isFollowing: false,
  },
  {
    id: 2,
    name: 'River Vance',
    genre: 'Indie',
    description:
      'Folk-rock storyteller known for intimate acoustic sessions and lyric-driven melodies.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    isFollowing: false,
  },
  {
    id: 3,
    name: 'The Voltage',
    genre: 'Rock',
    description:
      'High-energy alternative rock quartet pushing the boundaries of modern stadium anthems.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    isFollowing: false,
  },
  {
    id: 4,
    name: 'Synthetix',
    genre: 'Electronic',
    description:
      'Pioneering electronic producer and DJ. Creator of immersive audiovisual live experiences.',
    image:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
    isFollowing: false,
  },
  {
    id: 5,
    name: 'Marcus Dean',
    genre: 'R&B',
    description:
      'Smooth vocals meeting contemporary production. Multi-platinum selling artist and songwriter.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600',
    isFollowing: false,
  },
];

const CATEGORIES = ['All', 'Pop', 'Rock', 'Indie', 'Electronic', 'R&B'];

const DiscoverArtists = () => {
  const [artists, setArtists] = useState(INITIAL_ARTISTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeNav, setActiveNav] = useState('Artists');

  const navigate = useNavigate();

  // Redirection vers le profil de l'artiste
  const handleViewProfile = (artistId) => {
    navigate(`/artists/${artistId}`);
  };

  // Chargement des artistes depuis Laravel
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/artists')
      .then((res) => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setArtists(
            res.data.map((artist) => ({
              ...artist,
              isFollowing: artist.isFollowing ?? false,
              description:
                artist.description || artist.bio || 'No description available.',
              image:
                artist.image ||
                artist.avatar ||
                'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=600',
            }))
          );
        }
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des artistes:', error);
      });
  }, []);

  // Nombre d'artistes suivis
  const followingCount = artists.filter(
    (artist) => artist.isFollowing
  ).length;

  // Follow / Unfollow
  const handleToggleFollow = (id) => {
    setArtists((prevArtists) =>
      prevArtists.map((artist) =>
        artist.id === id
          ? {
            ...artist,
            isFollowing: !artist.isFollowing,
          }
          : artist
      )
    );
  };

  // Recherche + catégorie
  const filteredArtists = artists.filter((artist) => {
    const name = artist.name || '';
    const genre = artist.genre || '';
    const description = artist.description || '';

    const matchesCategory =
      selectedCategory === 'All' ||
      genre.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf9fe] text-slate-800 font-sans">

      {/* ================= NAVBAR ================= */}
      <header className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-10">

          {/* Logo */}
          <h1
            className="text-2xl font-black text-indigo-600 tracking-tight cursor-pointer"
            onClick={() => setActiveNav('Discover')}
          >
            FanSphere
          </h1>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">

            {['Discover', 'Artists', 'Marketplace', 'Community'].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setActiveNav(item)}
                  className={`transition pb-1 border-b-2 ${activeNav === item
                      ? 'text-indigo-600 border-indigo-600'
                      : 'text-slate-500 border-transparent hover:text-slate-800'
                    }`}
                >
                  {item}
                </button>
              )
            )}

            {/* Following counter */}
            <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              <Heart size={14} fill="currentColor" />
              <span>{followingCount} Following</span>
            </div>

          </nav>
        </div>

        {/* Login / Sign Up */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => alert('Redirection vers Login')}
            className="text-sm font-bold text-indigo-600 hover:text-indigo-800 px-4 py-2 transition"
          >
            Login
          </button>

          <button
            onClick={() => alert('Redirection vers Sign Up')}
            className="text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-xl shadow-sm transition active:scale-95"
          >
            Sign Up
          </button>

        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-8 py-10">

        {/* Header + Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">

          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Discover Artists
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Find and connect with your favorite creators.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">

            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search artists, genres, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100/80 text-sm pl-10 pr-4 py-2.5 rounded-xl border border-transparent focus:border-indigo-500 focus:bg-white outline-none transition"
            />

          </div>
        </div>

        {/* ================= CATEGORIES ================= */}
        <div className="flex flex-wrap gap-2.5 mb-10">

          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-200/60 text-slate-600 hover:bg-slate-200'
                }`}
            >
              {cat}
            </button>
          ))}

        </div>

        {/* ================= ARTISTS ================= */}
        {filteredArtists.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {filteredArtists.map((artist) => (

              <div
                key={artist.id}
                className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition"
              >

                <div>

                  {/* Image */}
                  <div className="relative h-64 bg-slate-100 overflow-hidden">

                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />

                    {/* Genre */}
                    <span className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Music size={10} />
                      {artist.genre}
                    </span>

                  </div>

                  {/* Artist information */}
                  <div className="p-5">

                    <h3 className="text-lg font-extrabold text-slate-900">
                      {artist.name}
                    </h3>

                    <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                      {artist.description}
                    </p>

                  </div>

                </div>

                {/* Buttons */}
                <div className="p-5 pt-0 flex gap-2">

                  {/* Follow */}
                  <button
                    onClick={() => handleToggleFollow(artist.id)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${artist.isFollowing
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm active:scale-95'
                      }`}
                  >
                    {artist.isFollowing ? (
                      <>
                        <Check size={14} />
                        Following
                      </>
                    ) : (
                      <>Follow</>
                    )}
                  </button>

                  {/* Profile */}
                  <button
                    onClick={() => handleViewProfile(artist.id)}
                    className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 rounded-xl text-xs font-bold transition active:scale-95"
                  >
                    Profile
                  </button>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* Aucun artiste */
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">

            <p className="text-slate-500 text-sm font-medium">
              Aucun artiste trouvé pour cette recherche.
            </p>

            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 text-xs font-bold text-indigo-600 underline"
            >
              Réinitialiser les filtres
            </button>

          </div>

        )}

      </main>
    </div>
  );
};

export default DiscoverArtists;
