import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GoogleLogin } from '@react-oauth/google';

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
    console.log('Formulario enviado:', formData);
    try {
      const response = await axios.post('/api/auth/register', formData);
      console.log('Respuesta del servidor:', response.data);
      setMessage(t('register_success'));
    } catch (error) {
      console.error('Error en registro:', error);
      setMessage(t('register_error'));
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('/api/auth/google', {
        credential: credentialResponse.credential
      });
      console.log('Usuario autenticado con Google:', response.data);
      setMessage(t('register_success'));
      // Aquí podrías redirigir automáticamente si quieres:
      // navigate('/login');
    } catch (error) {
      console.error('Error en autenticación con Google:', error);
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

        <div className="google-login">
          <p style={{ marginTop: '1em' }}>{t('or_register_with_google') || 'O regístrate con Google:'}</p>
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setMessage(t('register_error'))} />
        </div>

        {message && <p>{message}</p>}
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
