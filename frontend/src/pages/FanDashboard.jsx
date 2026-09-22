import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Bell, 
  HelpCircle, 
  LogOut, 
  Search, 
  FileText, 
  Tag, 
  Heart, 
  MessageSquare, 
  Share2, 
  MoreVertical 
} from 'lucide-react';

const FanDashboard = () => {
  const [stats, setStats] = useState({ newPosts: 12, upcomingEvents: 3, activeMemberships: 1 });
  const [user, setUser] = useState({ name: 'Alex', role: 'Compte Fan' });
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/fan/dashboard')
      .then(res => {
        if (res.data.stats) setStats(res.data.stats);
      })
      .catch(err => console.error("Erreur lors du chargement des données :", err));
  }, []);

  

 
  const handleLogout = () => {
    alert('Déconnexion réussie');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. Barre latérale (Sidebar) */}
      <aside className="w-64 bg-slate-100/70 border-r border-slate-200 p-6 flex flex-col justify-between">
        <div>
          {/* Logo */}
          <h1 
            className="text-2xl font-black text-indigo-600 mb-8 cursor-pointer" 
            onClick={() => setActiveTab('dashboard')}
          >
            FanSphere
          </h1>

          {/* Profil Utilisateur */}
          <div className="flex items-center gap-3 mb-8">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
              alt="Avatar de l'utilisateur" 
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200"
            />
            <div>
              <h3 className="font-bold text-sm text-slate-900">{user.name}</h3>
              <p className="text-xs text-slate-500">{user.role}</p>
            </div>
          </div>

          {/* Liens de navigation */}
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-200/50'
              }`}
            >
              <LayoutDashboard size={18} />
              Tableau de bord
            </button>

            <button 
              onClick={() => setActiveTab('artists')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'artists' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-200/50'
              }`}
            >
              <Users size={18} />
              Artistes
            </button>

            <button 
              onClick={() => setActiveTab('events')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'events' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-200/50'
              }`}
            >
              <Calendar size={18} />
              Événements
            </button>

            <button 
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'notifications' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-200/50'
              }`}
            >
              <Bell size={18} />
              Notifications
            </button>
          </nav>
        </div>

        {/* Actions du bas */}
        <div className="space-y-2 pt-6 border-t border-slate-200">
          <button 
            onClick={() => alert('Centre d’aide')} 
            className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-medium w-full text-left"
          >
            <HelpCircle size={16} />
            Centre d’aide
          </button>
          
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-red-600 text-xs font-medium w-full text-left transition"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* 2. Contenu Principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* En-tête */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">Bonjour, {user.name} !</h2>
            <p className="text-sm text-slate-500 mt-1">Voici ce qui se passe dans vos communautés aujourd'hui.</p>
          </div>

          {/* Bouton Explorer */}
          <button 
            onClick={() => alert('Redirection vers la page d’exploration...')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-5 py-2.5 rounded-full shadow-md transition active:scale-95"
          >
            <Search size={16} />
            Explorer
          </button>
        </div>

        {/* Grille de statistiques */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition cursor-pointer">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
              <FileText size={20} />
            </div>
            <div>
              <span className="text-2xl font-black text-slate-900">{stats.newPosts}</span>
              <p className="text-xs text-slate-500 font-medium">Nouveaux posts</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition cursor-pointer">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <Calendar size={20} />
            </div>
            <div>
              <span className="text-2xl font-black text-slate-900">{stats.upcomingEvents}</span>
              <p className="text-xs text-slate-500 font-medium">Événements à venir</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition cursor-pointer">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <Tag size={20} />
            </div>
            <div>
              <span className="text-2xl font-black text-slate-900">{stats.activeMemberships}</span>
              <p className="text-xs text-slate-500 font-medium">Abonnements actifs</p>
            </div>
          </div>
        </div>

        {/* Section Dernières Publications */}
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-6">Dernières publications</h3>

          {/* Carte de Publication */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden max-w-3xl">
            
            {/* En-tête de la carte */}
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100" 
                  alt="Avatar de l'artiste" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Neon Pulse</h4>
                  <p className="text-xs text-slate-400">Il y a 2 heures</p>
                </div>
              </div>

              <button 
                onClick={() => alert('Options de la publication')}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition"
              >
                <MoreVertical size={18} />
              </button>
            </div>

            {/* Aperçu média */}
            <div className="bg-slate-900 relative">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000" 
                alt="Contenu du post" 
                className="w-full h-80 object-cover opacity-90"
              />
            </div>

            {/* Corps de la publication */}
            <div className="p-5">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Aperçu exclusif du morceau</h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Salut tout le monde ! Voici un petit aperçu du nouveau morceau qui sort la semaine prochaine. Dites-moi ce que vous en pensez !
              </p>

              {/* Actions de bas de carte */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-slate-500 text-xs font-semibold">
                <div className="flex items-center gap-6">
                  
                  {/* Bouton J'aime */}
                  <button 
                    onClick={handleLike}
                    className={`flex items-center gap-1.5 transition active:scale-125 ${
                      liked ? 'text-red-500 font-bold' : 'hover:text-red-500'
                    }`}
                  >
                    <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
                    <span>{likeCount}</span>
                  </button>

                  {/* Bouton Commenter */}
                  <button 
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center gap-1.5 hover:text-indigo-600 transition"
                  >
                    <MessageSquare size={18} />
                    <span>{commentsCount}</span>
                  </button>

                </div>

                {/* Bouton Partager */}
                <button 
                  onClick={handleShare}
                  className="hover:text-slate-800 transition p-1"
                >
                  <Share2 size={18} />
                </button>
              </div>

              {/* Section Commentaires */}
              {showComments && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <form onSubmit={handleAddComment} className="flex gap-2 mb-4">
                    <input 
                      type="text" 
                      placeholder="Écrire un commentaire..." 
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      className="flex-1 bg-slate-100 text-sm px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button 
                      type="submit" 
                      className="bg-indigo-600 text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                      Publier
                    </button>
                  </form>

                  {/* Liste des commentaires dynamiques */}
                  <div className="space-y-2">
                    {commentsList.map((c, index) => (
                      <div key={index} className="bg-slate-50 p-2.5 rounded-lg text-xs text-slate-700">
                        <span className="font-bold text-slate-900 block">{user.name}</span>
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </section>

      </main>
    </div>
  );
};

export default FanDashboard;