const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  googleAuth,
  logoutUser,
  getCurrentUser
} = require('../controllers/authController');

const verifyToken = require('../middleware/verifyToken');

// Registro manual
router.post('/register', registerUser);

// Login manual
router.post('/login', loginUser);

// Login con cuenta de Google
router.post('/google', googleAuth);

// Logout (opcional)
router.post('/logout', logoutUser); // o bórralo directamente

// Ruta protegida: requiere token
router.get('/me', verifyToken, getCurrentUser);

module.exports = router;
