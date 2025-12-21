import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RegisterPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className="register-container">
        <h2>{t('register')}</h2>
        <form className="register-form">
          <label>
            {t('username')}
            <input type="text" placeholder={t('username_placeholder')} />
          </label>
          <label>
            {t('email')}
            <input type="email" placeholder={t('email_placeholder')} />
          </label>
          <label>
            {t('password')}
            <input type="password" placeholder={t('password_placeholder')} />
          </label>
          <button type="submit">{t('create_account')}</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
