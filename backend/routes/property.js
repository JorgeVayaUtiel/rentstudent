const express = require('express');
const router = express.Router();
const { placeholder } = require('../controllers/propertyController');

router.get('/', placeholder);
module.exports = router;
