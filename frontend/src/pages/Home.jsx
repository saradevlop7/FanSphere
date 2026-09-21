import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
);
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><path d="M17.5 6.5h.01"></path><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect></svg>
);

const Home = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

 
  const [following, setFollowing] = useState({});
  const [isLikedAurora, setIsLikedAurora] = useState(false);

  const toggleFollow = (artistName) => {
    setFollowing(prev => ({
      ...prev,
      [artistName]: !prev[artistName]
    }));
  };

  const initialArtists = [
    { id: 1, name: "The Nomads", genre: "Indie Rock", img: "https://images.unsplash.com/photo-1520193186411-e4070eb3e9d8?q=80&w=100&auto=format&fit=crop" },
    { id: 2, name: "J-Kruz", genre: "Hip Hop", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" },
    { id: 3, name: "Lia Vex", genre: "R&B", img: "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=100&auto=format&fit=crop" },
    { id: 4, name: "DJ Nova", genre: "Techno", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" }
  ];

 
  const events = [
    { id: 1, date: { day: "24", month: "OCT" }, title: "Synthwave Festival 2024: The Global Tour", location: "Neon Valley, Austin, CA", price: "$149.00", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop", tag: "Selling Fast" },
    { id: 2, date: { day: "05", month: "NOV" }, title: "Elias Thome: Acoustic Sessions & Q&A", location: "Virtual Event", price: "$25.00", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=600&auto=format&fit=crop", tag: "100+ Tickets Left" },
    { id: 3, date: { day: "12", month: "NOV" }, title: "DJ Nova Presents: Deep House All Nighter", location: "The Warehouse, London", price: "$49.00", img: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=600&auto=format&fit=crop", tag: "Virtual Access" }
  ];

 
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

 
  const filteredEvents = events.filter(ev => 
    ev.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ev.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* 1. HEADER / NAVBAR */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <span onClick={() => navigate('/')} className="text-2xl font-bold text-indigo-950 cursor-pointer">
              FanSphere
            </span>
            <div className="flex items-center gap-6 text-sm text-gray-700">
              <button onClick={() => navigate('/')} className="hover:text-indigo-600 font-medium">Discover</button>
              <button onClick={() => navigate('/admin')} className="hover:text-indigo-600">Artists</button>
              <button onClick={() => navigate('/event')} className="hover:text-indigo-600">Marketplace</button>
              <button onClick={() => navigate('/event')} className="hover:text-indigo-600">Community</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="search" 
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search artist, events..." 
                className="bg-gray-100 text-sm rounded-full px-4 py-2 w-64 outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <button 
              onClick={() => navigate('/login')} 
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 px-3 py-2"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/register')} 
              className="bg-indigo-600 text-white text-sm px-5 py-2 rounded-full hover:bg-indigo-700 transition-colors font-medium"
            >
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative bg-indigo-950 text-white overflow-hidden flex items-center" style={{ minHeight: '75vh' }}>
        <img 
          src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1920&auto=format&fit=crop" 
          alt="Concert Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/80 to-indigo-950/90"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-1.5 rounded-full text-xs backdrop-blur-sm mb-6">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
            Live Experiences Await
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight max-w-3xl mb-10">
            Connect with your favorite artists
          </h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/register')} 
              className="bg-indigo-600 text-white px-8 py-3.5 rounded-full flex items-center gap-2 hover:bg-indigo-700 transition-all font-medium shadow-lg shadow-indigo-600/30"
            >
              Get Started <span>→</span>
            </button>
            <button 
              onClick={() => navigate('/event')} 
              className="bg-white/10 text-white px-8 py-3.5 rounded-full flex items-center gap-2 hover:bg-white/20 transition-all font-medium backdrop-blur-sm"
            >
              <span className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center text-xs">▷</span>
              How it works
            </button>
          </div>
        </div>
      </section>

      {/* 3. TRENDING CREATORS SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-indigo-950">Trending Creators</h2>
              <p className="text-gray-600 mt-1">The most active artists in the sphere this week.</p>
            </div>
            <button onClick={() => navigate('/admin')} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Main Big Card (Aurora Synth) */}
            <div className="md:col-span-2 md:row-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center relative justify-center">
                <span className="absolute top-4 left-4 text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    Trending
                </span>
                <button 
                  onClick={() => setIsLikedAurora(!isLikedAurora)}
                  className={`absolute top-4 right-4 text-xl transition-colors ${isLikedAurora ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}
                >
                  {isLikedAurora ? '♥' : '♡'}
                </button>
                <img 
                  src="https://images.unsplash.com/photo-1516876395246-8148b52c0029?q=80&w=150&auto=format&fit=crop" 
                  alt="Aurora Synth" 
                  className="w-28 h-28 rounded-full object-cover mb-5 ring-4 ring-indigo-50"
                />
                <h3 className="text-2xl font-bold text-indigo-950">Aurora Synth</h3>
                <p className="text-sm text-gray-500 mb-6">Electro-pop • 1.2M Fans</p>
                <button 
                  onClick={() => toggleFollow('Aurora Synth')}
                  className={`w-full py-3 rounded-xl font-medium transition-all ${
                    following['Aurora Synth'] 
                      ? 'bg-gray-100 text-gray-700 border border-gray-200' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20'
                  }`}
                >
                  {following['Aurora Synth'] ? 'Following' : 'Follow'}
                </button>
            </div>

            {/* Small Cards */}
            {initialArtists.map((artist) => (
              <div key={artist.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center justify-between">
                <img src={artist.img} alt={artist.name} className="w-16 h-16 rounded-full object-cover mb-3" />
                <div>
                  <h4 className="font-semibold text-indigo-950">{artist.name}</h4>
                  <p className="text-xs text-gray-500 mb-4">{artist.genre}</p>
                </div>
                <button 
                  onClick={() => toggleFollow(artist.name)}
                  className={`w-full text-xs font-semibold px-4 py-2 rounded-full transition-colors ${
                    following[artist.name]
                      ? 'bg-gray-200 text-gray-800'
                      : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                  }`}
                >
                  {following[artist.name] ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
            
            {/* Discover More Card */}
            <div 
              onClick={() => navigate('/admin')} 
              className="bg-indigo-600 text-white p-5 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20"
            >
                <span className="text-3xl mb-1">+</span>
                <h4 className="font-semibold">Discover More</h4>
                <p className="text-xs text-indigo-100 mt-1">Find new artists in your sphere</p>
            </div>
            
            {/* Bottom Left Card (Alex Thome) */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
                    alt="Alex Thome" 
                    className="w-12 h-12 rounded-full object-cover" 
                  />
                  <div className="text-left">
                      <h4 className="font-semibold text-sm text-indigo-950">Alex Thome</h4>
                      <p className="text-xs text-gray-500">Acoustic</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleFollow('Alex Thome')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                    following['Alex Thome'] ? 'bg-gray-200 text-gray-800' : 'text-indigo-600 bg-indigo-50'
                  }`}
                >
                  {following['Alex Thome'] ? 'Following' : 'Follow'}
                </button>
            </div>

          </div>
        </div>
      </section>

      {/* 4. UPCOMING EXPERIENCES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-indigo-950">Upcoming Experiences</h2>
              <p className="text-gray-600 mt-1">Secure your spot at exclusive live events and virtual meetups.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <div key={event.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                <div className="relative h-52">
                  <img src={event.img} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl text-center shadow-md">
                    <span className="block text-xl font-bold text-indigo-950 leading-none">{event.date.day}</span>
                    <span className="block text-xs font-bold text-indigo-600 uppercase mt-0.5">{event.date.month}</span>
                  </div>
                  <span className={`absolute top-4 right-4 text-xs ${index === 0 ? 'bg-amber-100 text-amber-800' : index === 1 ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-100 text-emerald-800'} px-3 py-1 rounded-full font-semibold`}>
                    {event.tag}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs text-gray-500 mb-2 font-medium">
                    📍 {event.location}
                  </div>
                  <h3 className="text-lg font-bold text-indigo-950 mb-3 leading-snug flex-grow">{event.title}</h3>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-400 block">Starting at</span>
                      <span className="text-lg font-bold text-indigo-950">{event.price}</span>
                    </div>
                    <button 
                      onClick={() => navigate('/register')}
                      className="bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white px-5 py-2 rounded-full font-semibold text-sm transition-all"
                    >
                      {index === 1 ? "Reserve Spot" : "Get Tickets"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-indigo-950 text-indigo-200 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2 pr-6">
            <span className="text-3xl font-bold text-white block mb-4">FanSphere</span>
            <p className="text-sm leading-relaxed mb-6 text-indigo-300">
              Empowering the connection between creators and their biggest fans through exclusive digital and physical experiences.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 flex items-center justify-center border border-indigo-800 rounded-full hover:border-indigo-500 hover:text-white transition-colors"><FacebookIcon /></a>
              <a href="#" className="w-9 h-9 flex items-center justify-center border border-indigo-800 rounded-full hover:border-indigo-500 hover:text-white transition-colors"><TwitterIcon /></a>
              <a href="#" className="w-9 h-9 flex items-center justify-center border border-indigo-800 rounded-full hover:border-indigo-500 hover:text-white transition-colors"><InstagramIcon /></a>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Platform</h5>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => navigate('/')} className="hover:text-white">Discover</button></li>
              <li><button onClick={() => navigate('/event')} className="hover:text-white">Marketplace</button></li>
              <li><button onClick={() => navigate('/event')} className="hover:text-white">Events & Tickets</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">For Creators</h5>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => navigate('/register')} className="hover:text-white">Join FanSphere</button></li>
              <li><button onClick={() => navigate('/admin')} className="hover:text-white">Creator Studio</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Support</h5>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-indigo-900/60 text-center text-xs text-indigo-400">
          © 2026 FanSphere Inc. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;