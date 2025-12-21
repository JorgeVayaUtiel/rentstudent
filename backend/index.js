require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./models');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/property');

const app = express();

// ✅ 1. CORS (sin cookies, solo tokens)
app.use(cors({
  origin: 'https://rentstudent.net', // o http://localhost:5173 en dev
  credentials: false
}));

// ✅ 2. Middleware para JSON
app.use(express.json());

// ✅ 3. Rutas
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

// ✅ 4. Sincronizar base de datos
sequelize.sync()
  .then(() => console.log('✅ Database synced'))
  .catch(err => console.error('❌ DB error:', err));

// ✅ 5. Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
