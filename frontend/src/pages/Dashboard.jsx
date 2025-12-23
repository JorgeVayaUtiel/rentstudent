import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/SideBar';
import UserDashboardView from '../components/UserDashboardView';
import PublishProperty from '../components/PublishProperty';
import axios from 'axios';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem('token');
  console.log('🧠 TOKEN:', token);

  if (!token) {
    console.warn('🔴 No hay token. Redirigiendo a /login');
    navigate('/login');
    return;
  }

  axios.get('https://rentstudent.net/api/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      console.log('✅ Usuario recibido:', res.data);
      setUser(res.data);
    })
    .catch(err => {
      console.error('🔴 Error al cargar usuario:', err.response?.data || err.message);
      navigate('/login');
    });
}, []);

  if (!user) {
    return (
      <>
        <Header />
        <div className="text-center mt-10">
          <p>Cargando usuario...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="dashboard-layout">
      <Header />
      <div className="dashboard-main">
        <Sidebar user={user} />
        {/* <main>
          <UserDashboardView user={user} />
        </main> */}
        <main>
          <PublishProperty />
        </main>

      </div>
      <Footer />
    </div>
  );
}
