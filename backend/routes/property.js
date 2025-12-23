const express = require('express');
const router = express.Router();
const { createProperty } = require('../controllers/propertyController');

router.post('/', createProperty);

module.exports = router;
