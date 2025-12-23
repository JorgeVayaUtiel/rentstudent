import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/main.css';

export default function Sidebar({ user, activeSection, onSectionChange }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).finally(() => {
      navigate('/login');
    });
  };

  const navItems = [
    { id: 'overview', label: t('Resumen') },
    { id: 'publish', label: t('Publicar anuncio') },
    { id: 'messages', label: t('Mensajes') },
    { id: 'favorites', label: t('Favoritos') },
    { id: 'my-properties', label: t('Mis anuncios') },
  ];

  return (
    <aside className="sidebar">
      <h3>
        {t('hello_user', { name: user?.name?.split(' ')[0] || t('user') })}
      </h3>
      <ul>
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`sidebar-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => onSectionChange?.(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <button className="logout-btn" onClick={handleLogout}>
        {t('logout')}
      </button>
    </aside>
  );
}
