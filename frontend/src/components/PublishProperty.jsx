import { useState } from 'react';
import axios from 'axios';


export default function PublishProperty() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    city: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    console.error('❌ No hay token');
    return;
  }

  try {
    const res = await axios.post(
      'https://rentstudent.net/api/properties',
      {
        title: form.title,
        description: form.description,
        price: form.price
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log('✅ Anuncio creado:', res.data);

    // Limpieza del formulario
    setForm({
      title: '',
      description: '',
      price: '',
      city: ''
    });

  } catch (err) {
    console.error('❌ Error al crear anuncio:', err.response?.data || err.message);
  }
};


  return (
    <div>
      <h2>Publicar anuncio</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label><br />
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Descripción</label><br />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Precio (€)</label><br />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Ciudad</label><br />
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Publicar anuncio
        </button>
      </form>
    </div>
  );
}
