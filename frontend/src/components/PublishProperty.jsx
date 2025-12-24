import { useState } from 'react';
import axios from 'axios';

export default function PublishProperty({ onPropertyCreated }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    city: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    setErrorMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('No hay token de autenticación. Inicia sesión nuevamente.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await axios.post(
        'https://rentstudent.net/api/properties',
        {
          title: form.title,
          description: form.description,
          price: form.price,
          city: form.city
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const createdProperty = res.data?.property || res.data;
      setStatusMessage('Anuncio publicado correctamente.');

      if (createdProperty && onPropertyCreated) {
        onPropertyCreated(createdProperty);
      }

      setForm({
        title: '',
        description: '',
        price: '',
        city: ''
      });
    } catch (err) {
      console.error('❌ Error al crear anuncio:', err.response?.data || err.message);
      setErrorMessage('No se pudo crear el anuncio. Inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dashboard-section">
      <div className="dashboard-section__header">
        <div>
          <h2>Publicar anuncio</h2>
          <p className="section-subtitle">Completa los datos para compartir tu alojamiento.</p>
        </div>
      </div>

      {statusMessage && <div className="dashboard-alert success">{statusMessage}</div>}
      {errorMessage && <div className="dashboard-alert error">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="dashboard-form">
        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-inline">
          <div className="form-group">
            <label>Precio (€)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              min="0"
              step="50"
              required
            />
          </div>

          <div className="form-group">
            <label>Ciudad</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="primary-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Publicando...' : 'Publicar anuncio'}
        </button>
      </form>
    </div>
  );
}
