import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RegisterPage = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData); // DEBUG
    try {
	const response = await axios.post('/api/auth/register', formData);

      console.log('Respuesta del servidor:', response.data); // DEBUG
      setMessage(t('register_success'));
    } catch (error) {
      console.error('Error en registro:', error); // DEBUG
      setMessage(t('register_error'));
    }
  };

  return (
    <>
      <Header />
      <div className="register-container">
        <h2>{t('register')}</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label>
            {t('username')}
            <input
              type="text"
              name="name"
              placeholder={t('username_placeholder')}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            {t('email')}
            <input
              type="email"
              name="email"
              placeholder={t('email_placeholder')}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            {t('password')}
            <input
              type="password"
              name="password"
              placeholder={t('password_placeholder')}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">{t('create_account')}</button>
        </form>
        {message && <p>{message}</p>}
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
