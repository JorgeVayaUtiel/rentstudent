import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header>
      <div className="header-logo">
        <img src="assets/logo_rent.png" alt="Logo" />
        <h1>RentStudent</h1>
      </div>

      {/* BOTONES DE IDIOMA FUERA DEL MENÚ */}
      <div className="language-switcher">
        <button onClick={() => changeLanguage('es')}>ES</button>
        <button onClick={() => changeLanguage('en')}>EN</button>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      <nav className={menuOpen ? 'open' : ''}>
        {location.pathname !== '/registro' && (
          <a href="/registro">{t('register')}</a>
        )}
        {location.pathname !== '/login' && (
          <a href="/login">{t('login')}</a>
        )}
      </nav>
    </header>
  );
}
