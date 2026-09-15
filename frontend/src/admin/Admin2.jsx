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
