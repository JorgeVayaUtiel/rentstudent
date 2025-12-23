import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);       // menú móvil
  const [userMenuOpen, setUserMenuOpen] = useState(false); // menú usuario
  const [user, setUser] = useState(null);

  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      return;
    }

    fetch('https://rentstudent.net/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header>
      <div className="header-logo">
        <img src="assets/logo_rent.png" alt="Logo" />
        <h1>RentStudent</h1>
      </div>

      {/* BOTONES DE IDIOMA */}
      <div className="language-switcher">
        <button onClick={() => changeLanguage('es')}>ES</button>
        <button onClick={() => changeLanguage('en')}>EN</button>
      </div>

      {/* BOTÓN MENÚ MÓVIL */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      {/* MENÚ DE NAVEGACIÓN */}
      <nav className={menuOpen ? 'open' : ''}>
        {user ? (
          <div className="user-menu">
            <button
              className="user-menu-btn"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              {t('hello_user', {
                name: user.name?.split(' ')[0] || 'Usuario'
              })} ▾
            </button>

            {userMenuOpen && (
              <div className="user-dropdown">
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    navigate('/dashboard');
                  }}
                >
                  Dashboard
                </button>

                <button onClick={handleLogout}>
                  {t('logout') || 'Cerrar sesión'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {location.pathname !== '/registro' && (
              <a href="/registro">{t('register')}</a>
            )}
            {location.pathname !== '/login' && (
              <a href="/login">{t('login')}</a>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
