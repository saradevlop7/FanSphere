import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, Compass, Calendar, LogOut, User, PlusCircle } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-indigo-500 font-bold text-xl">
          <Music className="w-6 h-6" />
          <span>FanSphere</span>
        </Link>

        {/* Liens de navigation */}
        <div className="flex items-center space-x-6 text-gray-300">
          <Link to="/" className="flex items-center space-x-1 hover:text-white transition">
            <Compass className="w-4 h-4" />
            <span>Découvrir</span>
          </Link>

          <Link to="/events" className="flex items-center space-x-1 hover:text-white transition">
            <Calendar className="w-4 h-4" />
            <span>Événements</span>
          </Link>

          {/* Accessible aux admins ou artistes */}
          {token && (user.role === 'admin' || user.role === 'artist') && (
            <Link to="/admin" className="flex items-center space-x-1 hover:text-white transition text-indigo-400">
              <PlusCircle className="w-4 h-4" />
              <span>Publier</span>
            </Link>
          )}
        </div>

        {/* Authentification */}
        <div className="flex items-center space-x-4">
          {token ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-300 font-medium flex items-center gap-1.5 bg-gray-800/60 px-3 py-1.5 rounded-lg border border-gray-700/50">
                <User className="w-4 h-4 text-indigo-400" />
                {user.name || 'Fan'}
              </span>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/20 px-3 py-1.5 rounded-lg text-sm transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm transition font-medium"
            >
              <User className="w-4 h-4" />
              <span>Connexion</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}