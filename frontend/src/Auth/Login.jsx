import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await api.post('/login', {
        email: email,
        password: password,
      });

      console.log('Login response:', response.data);

      // تخزين token
      localStorage.setItem('token', response.data.token);

      // تخزين معلومات المستخدم
      localStorage.setItem(
        'user',
        JSON.stringify(response.data.user)
      );

      // الانتقال للصفحة الرئيسية
      navigate('/');

    } catch (err) {
      console.error('Login error:', err);

      if (err.response) {
        console.log('Status:', err.response.status);
        console.log('Data:', err.response.data);

        setError(
          err.response.data.message ||
          'Erreur lors de la connexion'
        );
      } else {
        setError(
          'Impossible de contacter le serveur Laravel'
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">

      <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl w-full max-w-md shadow-xl">

        {/* TITRE */}
        <div className="text-center mb-8">

          <div className="inline-flex p-3 bg-indigo-600/10 text-indigo-500 rounded-xl mb-3">
            <LogIn className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-white">
            Connexion à FanSphere
          </h2>

        </div>

        {/* ERREUR */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}
          <div>

            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>

            <div className="relative">

              <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                placeholder="alex@gmail.com"
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block text-sm font-medium text-gray-300 mb-2">
              Mot de passe
            </label>

            <div className="relative">

              <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                placeholder="••••••••"
              />

            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition flex items-center justify-center space-x-2 disabled:opacity-50"
          >

            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Connexion...</span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>Se connecter</span>
              </>
            )}

          </button>

        </form>

        {/* REGISTER */}
        <p className="text-center text-sm text-gray-400 mt-6">

          Pas encore de compte ?{' '}

          <Link
            to="/register"
            className="text-indigo-400 hover:underline"
          >
            S'inscrire
          </Link>

        </p>

      </div>

    </div>
  );
}