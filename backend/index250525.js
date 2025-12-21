require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./models');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/property');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

sequelize.sync()
  .then(() => console.log('✅ Database synced'))
  .catch(err => console.error('❌ DB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));

