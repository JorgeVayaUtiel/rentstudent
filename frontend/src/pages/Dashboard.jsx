import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/SideBar';
import PublishProperty from '../components/PublishProperty';
import axios from 'axios';

const StatCard = ({ label, value }) => (
  <div className="stat-card">
    <span className="stat-label">{label}</span>
    <span className="stat-value">{value}</span>
  </div>
);

const PropertiesList = ({ properties }) => {
  if (!properties?.length) {
    return <p className="muted">Todavía no has publicado anuncios.</p>;
  }

  return (
    <ul className="data-list">
      {properties.map((property, index) => (
        <li className="data-card" key={property.id || property._id || index}>
          <div>
            <h4>{property.title || 'Propiedad sin título'}</h4>
            <p className="muted">{property.city || 'Ubicación no especificada'}</p>
          </div>
          <div className="badge">
            {property.price ? `${property.price} €` : 'Sin precio'}
          </div>
        </li>
      ))}
    </ul>
  );
};

const FavoritesList = ({ favorites }) => {
  if (!favorites?.length) {
    return <p className="muted">Aún no tienes favoritos guardados.</p>;
  }

  return (
    <ul className="data-list">
      {favorites.map((favorite, index) => (
        <li className="data-card" key={favorite.id || favorite._id || index}>
          <div>
            <h4>{favorite.title || 'Favorito sin título'}</h4>
            <p className="muted">
              {favorite.city || favorite.location || 'Ubicación no especificada'}
            </p>
          </div>
          {favorite.price && <div className="badge">{favorite.price} €</div>}
        </li>
      ))}
    </ul>
  );
};

const MessagesList = ({ messages }) => {
  if (!messages?.length) {
    return <p className="muted">No tienes mensajes nuevos.</p>;
  }

  return (
    <ul className="data-list">
      {messages.map((message, index) => (
        <li className="data-card" key={message.id || message._id || index}>
          <div>
            <h4>{message.subject || 'Mensaje recibido'}</h4>
            <p className="muted">
              {message.from?.name || message.from || message.sender || 'Contacto'}
            </p>
            <p>{message.body || message.text || message.content}</p>
          </div>
          {message.created_at && (
            <span className="muted small">
              {new Date(message.created_at).toLocaleDateString()}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

const ProfileSummary = ({ user }) => (
  <div className="profile-card">
    <h3>Datos de tu cuenta</h3>
    <p><strong>Nombre:</strong> {user?.name || 'Sin nombre'}</p>
    <p><strong>Email:</strong> {user?.email || 'Sin correo'}</p>
    {user?.phone && <p><strong>Teléfono:</strong> {user.phone}</p>}
    {user?.created_at && (
      <p className="muted small">
        Cuenta creada el {new Date(user.created_at).toLocaleDateString()}
      </p>
    )}
  </div>
);

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeSection, setActiveSection] = useState('overview');
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const syncUserData = useCallback((profile) => {
    setUser(profile);
    setProperties(profile?.properties || []);
    setFavorites(profile?.favorites || []);
    setMessages(profile?.messages || []);
  }, []);

  const loadUserProfile = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('🔴 No hay token. Redirigiendo a /login');
      navigate('/login');
      return;
    }

    try {
      setLoadingProfile(true);
      const res = await axios.get('https://rentstudent.net/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      syncUserData(res.data);
      setAlertMessage('');
    } catch (err) {
      console.error('🔴 Error al cargar usuario:', err.response?.data || err.message);
      setAlertMessage('No se pudo cargar tu perfil. Vuelve a iniciar sesión.');
      navigate('/login');
    } finally {
      setLoadingProfile(false);
    }
  }, [navigate, syncUserData]);

  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  const handlePropertyCreated = useCallback((newProperty) => {
    if (newProperty) {
      setProperties((prev) => [newProperty, ...prev]);
    }
    setActiveSection('my-properties');
  }, []);

  const renderSection = useMemo(() => {
    if (!user) {
      return (
        <div className="text-center mt-10">
          <p>Cargando usuario...</p>
        </div>
      );
    }

    switch (activeSection) {
      case 'publish':
        return <PublishProperty onPropertyCreated={handlePropertyCreated} />;
      case 'messages':
        return (
          <div className="dashboard-section">
            <div className="dashboard-section__header">
              <div>
                <h2>Mensajes</h2>
                <p className="section-subtitle">Contacta con estudiantes interesados en tus anuncios.</p>
              </div>
              <button className="ghost-btn" type="button" onClick={loadUserProfile}>
                Actualizar
              </button>
            </div>
            <MessagesList messages={messages} />
          </div>
        );
      case 'favorites':
        return (
          <div className="dashboard-section">
            <div className="dashboard-section__header">
              <div>
                <h2>Favoritos</h2>
                <p className="section-subtitle">Lista de anuncios que guardaste para revisar después.</p>
              </div>
              <button className="ghost-btn" type="button" onClick={loadUserProfile}>
                Actualizar
              </button>
            </div>
            <FavoritesList favorites={favorites} />
          </div>
        );
      case 'my-properties':
        return (
          <div className="dashboard-section">
            <div className="dashboard-section__header">
              <div>
                <h2>Mis anuncios</h2>
                <p className="section-subtitle">Gestiona los alojamientos que has publicado.</p>
              </div>
              <button className="ghost-btn" type="button" onClick={loadUserProfile}>
                Actualizar
              </button>
            </div>
            <PropertiesList properties={properties} />
          </div>
        );
      default:
        return (
          <div className="dashboard-section">
            <div className="dashboard-section__header">
              <div>
                <h2>Resumen</h2>
                <p className="section-subtitle">
                  Gestiona tus anuncios, favoritos y mensajes desde un mismo lugar.
                </p>
              </div>
              <button className="ghost-btn" type="button" onClick={loadUserProfile}>
                Actualizar
              </button>
            </div>

            <div className="overview-grid">
              <StatCard label="Anuncios publicados" value={properties.length} />
              <StatCard label="Favoritos" value={favorites.length} />
              <StatCard label="Mensajes" value={messages.length} />
            </div>

            <ProfileSummary user={user} />
          </div>
        );
    }
  }, [activeSection, favorites, handlePropertyCreated, loadUserProfile, messages, properties, user]);

  return (
    <div className="dashboard-layout">
      <Header />
      <div className="dashboard-main">
        <Sidebar
          user={user}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <main className="dashboard-content">
          {alertMessage && <div className="dashboard-alert error">{alertMessage}</div>}
          {loadingProfile ? (
            <p className="muted">Cargando usuario...</p>
          ) : (
            renderSection
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
