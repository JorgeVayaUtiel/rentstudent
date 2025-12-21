import React, { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({ nombre: '', email: '' });
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('Enviando...');
    try {
      const res = await fetch('/api/usuarios/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMensaje(res.ok ? 'Registrado' : data.mensaje);
    } catch {
      setMensaje('Error al enviar');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" onChange={handleChange} placeholder="Nombre" required />
        <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
        <button>Enviar</button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
}
