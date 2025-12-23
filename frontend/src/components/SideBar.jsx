import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/main.css';

export default function Sidebar({ user }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).then(() => {
      navigate('/login');
    });
  };

  return (
    <aside className="sidebar">
      <h3>
        {t('hello_user', { name: user.name?.split(' ')[0] || t('user') })}
      </h3>
      <ul>
        {/* <li><a href="/profile">{t('profile')}</a></li> */}
        <li><a href="/publish">{t('Publicar anuncio')}</a></li>
        <li><a href="/messages">{t('Mensajes')}</a></li>
         <li><a href="/favorites">{t('Favoritos')}</a></li>
        <li><a href="/my-properties">{t('Mis anuncios')}</a></li>
        
       
        
      </ul>
      <button className="logout-btn" onClick={handleLogout}>
        {t('logout')}
      </button>
    </aside>
  );
}
