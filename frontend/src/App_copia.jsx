import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard'; // ✅ añadido
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);

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
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('No autenticado');
      })
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ AÑADIDO */}
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
