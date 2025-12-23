// Placeholder property controller
exports.placeholder = (req, res) => {
  res.json({ message: 'Property controller ready' });
};

const { Property } = require('../models');

exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      city: req.body.city || null
    });

    return res.status(201).json(property);
  } catch (err) {
    console.error('❌ CREATE PROPERTY ERROR:', err);
    return res.status(500).json({
      error: 'Error creating property',
      details: err.message
    });
  }
};


