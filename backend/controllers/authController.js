const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1d';

// Helper para generar token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// Registro
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash: hashedPassword,
      role,
      isVerified: false,
      authProvider: 'local'
    });

    const token = generateToken(user);
    res.status(201).json({ token });

  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email already in use' });
    }
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};

// Login manual
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || user.authProvider !== 'local') {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });

  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ error: 'Login fallido', details: error.message });
  }
};

// Login con Google
exports.googleAuth = async (req, res) => {
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const { email, name } = ticket.getPayload();

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        name,
        email,
        isVerified: true,
        authProvider: 'google',
        role: 'student'
      });
    }

    const token = generateToken(user);
    res.status(200).json({ token });

  } catch (err) {
    console.error('❌ Error en Google Auth:', err);
    res.status(401).json({ error: 'Google authentication failed', details: err.message });
  }
};

// Obtener usuario desde token
exports.getCurrentUser = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.status(200).json(decoded);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Logout ya no es necesario (se hace borrando el token del cliente)
exports.logoutUser = (_req, res) => {
  res.status(200).json({ message: 'Logout: client should delete token' });
};
