import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function UserDashboardView({ user }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const hasProperties = user.properties && user.properties.length > 0;

  return (
    <div>
      <h2>{t('dashboard_welcome', { name: user.name?.split(' ')[0] || t('user') })}</h2>

      {hasProperties ? (
        <>
          <p>{t('your_listings')}</p>
          <ul>
            {user.properties.map((property) => (
              <li key={property.id}>
                <a href={`/property/${property.id}`}>
                  {property.title || t('property_without_title')}
                </a>
              </li>
            ))}
          </ul>
          <button onClick={() => navigate('/publish')}>
            {t('publish_new')}
          </button>
        </>
      ) : (
        <div>
          <p>{t('no_properties_yet')}</p>
          <button onClick={() => navigate('/publish')}>
            {t('publish_first')}
          </button>
        </div>
      )}

      <hr style={{ margin: '2em 0' }} />

      <h3>{t('favorites')}</h3>
      {/* Aquí puedes renderizar los favoritos si están en user.favorites o similar */}
      <p>{t('favorites_placeholder')}</p>

      <h3>{t('messages')}</h3>
      {/* Mensajes pendientes o conversaciones */}
      <p>{t('messages_placeholder')}</p>
    </div>
  );
}
