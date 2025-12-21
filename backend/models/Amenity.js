const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Amenity = sequelize.define('Amenity', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: DataTypes.STRING,
  slug: { type: DataTypes.STRING, unique: true }
});

module.exports = Amenity;