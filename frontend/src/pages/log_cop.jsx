import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    try {
      const response = await axios.post('/api/auth/login', formData, {
        withCredentials: true
      });
      console.log('Login exitoso:', response.data);
      setMessage(t('login_success'));
      setTimeout(() => {
        window.location.href = '/';  // Redirige al inicio
      }, 1500);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMessage(t('login_error'));
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        '/api/auth/google',
        { credential: credentialResponse.credential },
        { withCredentials: true }
      );
      console.log('Login con Google:', response.data);
      setMessage(t('login_success'));
      setTimeout(() => {
        window.location.href = '/';  // Redirige al inicio
      }, 1500);
    } catch (error) {
      console.error('Error con Google:', error);
      setMessage(t('login_error'));
    }
  };

  return (
    <>
      <Header />
      <div className="register-container">
        <h2>{t('login')}</h2>
        <form className="register-form" onSubmit={handleSubmit}>
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
          <button type="submit">{t('login')}</button>
        </form>

        <div className="google-login">
          <p style={{ marginTop: '1em' }}>
            {t('or_login_with_google') || 'O inicia sesión con Google'}
          </p>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setMessage(t('login_error'))}
          />
        </div>

        {message && <p>{message}</p>}
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
