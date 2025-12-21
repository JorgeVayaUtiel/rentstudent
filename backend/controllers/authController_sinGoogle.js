const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Cifrar la contraseña antes de guardarla
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email,
      passwordHash: hashedPassword,
      role
    });

    // No devolver el hash al frontend por seguridad
    const { passwordHash, ...userWithoutPassword } = user.toJSON();

    res.status(201).json(userWithoutPassword);

  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};
