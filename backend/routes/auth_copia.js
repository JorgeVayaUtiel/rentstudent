const express = require('express');
const router = express.Router();
//const { registerUser } = require('../controllers/authController');
const { registerUser, googleAuth } = require('../controllers/authController');
router.post('/register', registerUser);
router.post('/google', googleAuth);
router.get('/me', (req, res) => {
  if (req.session && req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ message: 'No autenticado' });
  }
});

module.exports = router;
