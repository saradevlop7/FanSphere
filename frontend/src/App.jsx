import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, Compass, Calendar, LogOut, User, PlusCircle, Menu, X } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));

  // Réaction automatique aux changements de connexion dans Login.jsx et Register.jsx
  useEffect(() => {
    const handleAuthChange = () => {
      setToken(localStorage.getItem('token'));
      setUser(JSON.parse(localStorage.getItem('user') || '{}'));
    };

    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser({});
    window.dispatchEvent(new Event('authChange'));
    setMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-4 md:px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-indigo-500 font-bold text-xl">
          <Music className="w-6 h-6" />
          <span>FanSphere</span>
        </Link>

        {/* Liens de navigation Desktop */}
        <div className="hidden md:flex items-center space-x-6 text-gray-300">
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
            <Link to="/admin" className="flex items-center space-x-1 hover:text-white transition text-indigo-400 font-medium">
              <PlusCircle className="w-4 h-4" />
              <span>Publier</span>
            </Link>
          )}
        </div>

        {/* Authentification Desktop */}
        <div className="hidden md:flex items-center space-x-4">
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

        {/* Bouton Menu Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Affichage du Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-800 space-y-4">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2 text-gray-300 hover:text-white py-1"
          >
            <Compass className="w-5 h-5" />
            <span>Découvrir</span>
          </Link>

          <Link
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2 text-gray-300 hover:text-white py-1"
          >
            <Calendar className="w-5 h-5" />
            <span>Événements</span>
          </Link>

          {token && (user.role === 'admin' || user.role === 'artist') && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 text-indigo-400 py-1"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Publier</span>
            </Link>
          )}

          <div className="pt-2 border-t border-gray-800/60">
            {token ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <User className="w-4 h-4 text-indigo-400" />
                  <span>Connecté en tant que <strong>{user.name || 'Fan'}</strong></span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                <User className="w-4 h-4" />
                <span>Connexion</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}