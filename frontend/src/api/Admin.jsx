import React, { useState } from 'react';
import api from '../api/axios';
import { 
  FileText, 
  Calendar, 
  PlusCircle, 
  Image as ImageIcon, 
  MapPin, 
  DollarSign, 
  Link as LinkIcon, 
  CheckCircle2, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('publication'); // 'publication' ou 'event'
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Formulaire Publication
  const [pubForm, setPubForm] = useState({
    title: '',
    content: '',
    media_url: '',
  });

  // Formulaire Événement
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    ticket_price: '',
    ticket_url: '',
  });

  // Soumission Formulaire Publication
  const handlePubSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await api.post('/publications', pubForm);
      setMessage({ type: 'success', text: 'Publication ajoutée avec succès !' });
      setPubForm({ title: '', content: '', media_url: '' });
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Erreur lors de la création de la publication.' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Soumission Formulaire Événement
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await api.post('/events', eventForm);
      setMessage({ type: 'success', text: 'Événement créé avec succès !' });
      setEventForm({
        title: '',
        description: '',
        date: '',
        location: '',
        ticket_price: '',
        ticket_url: '',
      });
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Erreur lors de la création de l’événement.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Espace Publication</h1>
        <p className="text-gray-400">
          Publiez des nouveautés ou annoncez de futurs événements pour vos fans.
        </p>
      </div>

      {/* Onglets de Navigation */}
      <div className="flex space-x-4 border-b border-gray-800 mb-8">
        <button
          onClick={() => { setActiveTab('publication'); setMessage({ type: '', text: '' }); }}
          className={`pb-4 px-2 font-medium text-sm flex items-center space-x-2 border-b-2 transition ${
            activeTab === 'publication'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span>Nouvelle Publication</span>
        </button>

        <button
          onClick={() => { setActiveTab('event'); setMessage({ type: '', text: '' }); }}
          className={`pb-4 px-2 font-medium text-sm flex items-center space-x-2 border-b-2 transition ${
            activeTab === 'event'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Nouvel Événement</span>
        </button>
      </div>

      {/* Alerte succès/erreur */}
      {message.text && (
        <div className={`p-4 rounded-xl mb-6 text-sm flex items-center space-x-3 border ${
          message.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Formulaire Publication */}
      {activeTab === 'publication' && (
        <form onSubmit={handlePubSubmit} className="bg-gray-900 border border-gray-800 p-6 md:p-8 rounded-2xl space-y-6 shadow-xl">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Titre de l'actualité *</label>
            <input
              type="text"
              required
              value={pubForm.title}
              onChange={(e) => setPubForm({ ...pubForm, title: e.target.value })}
              placeholder="Ex: Sortie de mon nouvel album 'Eclipse'"
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Contenu *</label>
            <textarea
              required
              rows={5}
              value={pubForm.content}
              onChange={(e) => setPubForm({ ...pubForm, content: e.target.value })}
              placeholder="Partagez un message avec vos fans..."
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Lien d'image / Média (Optionnel)</label>
            <div className="relative">
              <ImageIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="url"
                value={pubForm.media_url}
                onChange={(e) => setPubForm({ ...pubForm, media_url: e.target.value })}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg transition flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Publication en cours...</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5" />
                <span>Publier l'actualité</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Formulaire Événement */}
      {activeTab === 'event' && (
        <form onSubmit={handleEventSubmit} className="bg-gray-900 border border-gray-800 p-6 md:p-8 rounded-2xl space-y-6 shadow-xl">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Titre du concert / événement *</label>
            <input
              type="text"
              required
              value={eventForm.title}
              onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
              placeholder="Ex: Live Tour 2026 - Casablanca"
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
            <textarea
              required
              rows={4}
              value={eventForm.description}
              onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
              placeholder="Détails du concert, programme..."
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date et Heure *</label>
              <input
                type="datetime-local"
                required
                value={eventForm.date}
                onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Lieu / Ville *</label>
              <div className="relative">
                <MapPin className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  required
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  placeholder="Ex: Stdio Arts, Casablanca"
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Prix du billet (DH / €)</label>
              <div className="relative">
                <DollarSign className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="number"
                  step="0.01"
                  value={eventForm.ticket_price}
                  onChange={(e) => setEventForm({ ...eventForm, ticket_price: e.target.value })}
                  placeholder="Ex: 150"
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Lien de la billetterie</label>
              <div className="relative">
                <LinkIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="url"
                  value={eventForm.ticket_url}
                  onChange={(e) => setEventForm({ ...eventForm, ticket_url: e.target.value })}
                  placeholder="https://guichet.ma/..."
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg transition flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Création de l'événement...</span>
              </>
            ) : (
              <>
                <Calendar className="w-5 h-5" />
                <span>Créer l'événement</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}