import React, { useState } from 'react';
import { useParams, useNavigate } from 'react';
import { 
  Heart, Share2, MapPin, Calendar, Globe, 
  MessageSquare, Bookmark, Play, Check, ArrowLeft 
} from 'lucide-react';

const ARTISTS_DATA = {
  1: {
    name: 'Luna Echo',
    genre: 'Electronic / Synthwave',
    bio: 'Pushing the boundaries of atmospheric electronic music. Exploring the intersection of analog synthesizers and digital landscapes. Join me for behind-the-scenes production insights and exclusive early releases.',
    followers: '125K',
    eventsCount: 42,
    tracksCount: 18,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    banner: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200',
    location: 'Based in Berlin',
    joined: 'Joined Sept 2023',
    website: 'lunaecho.com',
    nextGig: {
      dateMonth: 'OCT',
      dateDay: '24',
      title: 'Neon Nights Festival',
      info: 'Main Stage • 11 PM'
    },
    posts: [
      {
        id: 101,
        time: '2 hours ago',
        content: 'Just wrapped up the final mix for the new EP "Neon Shadows". I wanted to give my FanSphere supporters a sneak peek before it hits the streaming platforms next week. Let me know what you think of the synth progression in the bridge!',
        mediaThumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
        likes: 1200,
        comments: 84
      }
    ]
  },
  2: {
    name: 'River Vance',
    genre: 'Indie / Folk',
    bio: 'Folk-rock storyteller known for intimate acoustic sessions and lyric-driven melodies.',
    followers: '88K',
    eventsCount: 15,
    tracksCount: 24,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    banner: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=1200',
    location: 'Based in Nashville',
    joined: 'Joined Jan 2022',
    website: 'rivervance.com',
    nextGig: {
      dateMonth: 'NOV',
      dateDay: '12',
      title: 'Acoustic Sessions Unplugged',
      info: 'The Basement East • 8 PM'
    },
    posts: []
  }
};

const ArtistProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const artist = ARTISTS_DATA[id] || ARTISTS_DATA[1];

  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('Publications');
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});

  const handleToggleLike = (postId, initialLikes) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleToggleSave = (postId) => {
    setSavedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: artist.name,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien du profil copié dans le presse-papier !');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9fe] text-slate-800 font-sans pb-16">
      
      {/* 1. Header / Navbar */}
      <header className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/artists')} 
            className="p-2 hover:bg-slate-100 rounded-full transition text-slate-600"
            title="Retour"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 
            className="text-2xl font-black text-indigo-600 tracking-tight cursor-pointer"
            onClick={() => navigate('/artists')}
          >
            FanSphere
          </h1>
          <nav className="hidden md:flex gap-6 text-sm font-semibold ml-4">
            <button onClick={() => navigate('/artists')} className="text-slate-500 hover:text-slate-800">Discover</button>
            <button onClick={() => navigate('/artists')} className="text-indigo-600 border-b-2 border-indigo-600 pb-1">Artists</button>
            <button className="text-slate-500 hover:text-slate-800">Marketplace</button>
            <button className="text-slate-500 hover:text-slate-800">Community</button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 px-4 py-2">Login</button>
          <button className="text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-xl shadow-sm transition">Sign Up</button>
        </div>
      </header>

      {/* 2. Banner & Header Profile Section */}
      <div className="max-w-6xl mx-auto px-4 mt-4">
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
          
          {/* Banner Image */}
          <div className="h-64 md:h-80 w-full relative bg-slate-900">
            <img 
              src={artist.banner} 
              alt={artist.name} 
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          {/* Profile Header Info */}
          <div className="px-8 pb-8 pt-4 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-20 md:-mt-24 mb-6">
              
              {/* Avatar + Main Info */}
              <div className="flex flex-col md:flex-row items-center md:items-end gap-5 text-center md:text-left">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white shadow-md overflow-hidden bg-white shrink-0">
                  <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover" />
                </div>
                <div className="mb-2">
                  <h2 className="text-3xl font-black text-slate-900">{artist.name}</h2>
                  <p className="text-xs font-bold text-slate-500 mt-1 flex items-center justify-center md:justify-start gap-1">
                    <span>🎵</span> {artist.genre}
                  </p>
                </div>
              </div>

              {/* Action Buttons (Follow & Share) */}
              <div className="flex items-center justify-center gap-3">
                <button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-8 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 ${
                    isFollowing 
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm active:scale-95'
                  }`}
                >
                  {isFollowing ? <><Check size={16} /> Following</> : 'Follow'}
                </button>

                <button 
                  onClick={handleShare}
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl transition"
                  title="Partager le profil"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              {artist.bio}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-6 pt-6 border-t border-slate-100">
              <div>
                <span className="block text-xl font-black text-slate-900">{artist.followers}</span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Followers</span>
              </div>
              <div>
                <span className="block text-xl font-black text-slate-900">{artist.eventsCount}</span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Events</span>
              </div>
              <div>
                <span className="block text-xl font-black text-slate-900">{artist.tracksCount}</span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Exclusive Tracks</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Tabbed Content & Sidebar */}
      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Feed Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Navigation Tabs */}
          <div className="flex gap-6 border-b border-slate-200 pb-3">
            {['Publications', 'Events', 'Merch'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-bold transition relative ${
                  activeTab === tab 
                    ? 'text-indigo-600' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Posts List */}
          {activeTab === 'Publications' && (
            <div className="space-y-6">
              {artist.posts && artist.posts.length > 0 ? (
                artist.posts.map((post) => {
                  const isLiked = likedPosts[post.id];
                  const isSaved = savedPosts[post.id];
                  const currentLikes = isLiked ? post.likes + 1 : post.likes;

                  return (
                    <div key={post.id} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                      {/* Post Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img src={artist.avatar} alt={artist.name} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-900">{artist.name}</h4>
                            <span className="text-xs text-slate-400">{post.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Post Content */}
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {post.content}
                      </p>

                      {/* Media Card / Video Preview */}
                      <div className="relative rounded-2xl overflow-hidden bg-slate-900 mb-4 group cursor-pointer">
                        <img src={post.mediaThumbnail} alt="Media preview" className="w-full h-72 object-cover opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-lg transition transform group-hover:scale-110">
                            <Play size={24} className="ml-1 fill-indigo-600" />
                          </button>
                        </div>
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-xs font-bold text-slate-500">
                        <div className="flex items-center gap-6">
                          <button 
                            onClick={() => handleToggleLike(post.id, post.likes)}
                            className={`flex items-center gap-1.5 transition ${isLiked ? 'text-rose-500' : 'hover:text-slate-800'}`}
                          >
                            <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                            <span>{(currentLikes / 1000).toFixed(1)}k</span>
                          </button>

                          <button className="flex items-center gap-1.5 hover:text-slate-800 transition">
                            <MessageSquare size={16} />
                            <span>{post.comments}</span>
                          </button>
                        </div>

                        <button 
                          onClick={() => handleToggleSave(post.id)}
                          className={`flex items-center gap-1.5 transition ${isSaved ? 'text-indigo-600' : 'hover:text-slate-800'}`}
                        >
                          <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
                          <span>{isSaved ? 'Saved' : 'Save'}</span>
                        </button>
                      </div>

                    </div>
                  );
                })
              ) : (
                <div className="bg-white rounded-2xl p-8 text-center text-slate-400 text-sm">
                  Aucune publication disponible pour le moment.
                </div>
              )}
            </div>
          )}

          {activeTab === 'Events' && (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-500 text-sm border border-slate-100">
              Liste des événements à venir pour {artist.name}.
            </div>
          )}

          {activeTab === 'Merch' && (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-500 text-sm border border-slate-100">
              Boutique de produits dérivés (Merch) bientôt disponible.
            </div>
          )}

        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-6">
          
          {/* About Box */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-base font-extrabold text-slate-900 mb-4">About</h3>
            <div className="space-y-3.5 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-indigo-600" />
                <span>{artist.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-indigo-600" />
                <span>{artist.joined}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={16} className="text-indigo-600" />
                <a href={`https://${artist.website}`} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                  {artist.website}
                </a>
              </div>
            </div>
          </div>

          {/* Next Gig Box */}
          {artist.nextGig && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h3 className="text-base font-extrabold text-slate-900 mb-4">Next Gig</h3>
              <div className="flex items-center gap-4 mb-5">
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-3 text-center min-w-[60px]">
                  <span className="block text-[10px] font-black text-indigo-600 tracking-wider uppercase">{artist.nextGig.dateMonth}</span>
                  <span className="block text-xl font-black text-indigo-600">{artist.nextGig.dateDay}</span>
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">{artist.nextGig.title}</h4>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{artist.nextGig.info}</p>
                </div>
              </div>

              <button 
                onClick={() => alert(`Achat de billets pour : ${artist.nextGig.title}`)}
                className="w-full py-2.5 border border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-bold rounded-xl text-xs transition active:scale-95"
              >
                Get Tickets
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ArtistProfile;