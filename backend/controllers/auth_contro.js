const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Registro con email y contraseña
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email,
      passwordHash: hashedPassword,
      isVerified: false,
      authProvider: 'local'
    });

    // Guardar sesión
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
	properties: [] 
    };

    const { passwordHash, ...userWithoutPassword } = user.toJSON();
    res.status(201).json(userWithoutPassword);

  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email already in use' });
    }
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};

// Login con email y contraseña
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || user.authProvider !== 'local') {
      return res.status(401).json({ error: 'Usuario no encontrado o método no válido' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
 properties: [] 
    };

    const { passwordHash, ...userWithoutPassword } = user.toJSON();
    res.status(200).json(userWithoutPassword);

  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

// Login con cuenta de Google
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
        authProvider: 'google'
      });
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
 properties: [] 
    };

    const { passwordHash, ...userWithoutPassword } = user.toJSON();
    res.status(200).json(userWithoutPassword);

  } catch (err) {
    res.status(401).json({ error: 'Google authentication failed', details: err.message });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
    res.clearCookie('connect.sid'); // nombre por defecto de la cookie de sesión
    res.json({ message: 'Sesión cerrada correctamente' });
  });
};
