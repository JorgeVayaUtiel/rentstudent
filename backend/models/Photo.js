const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Photo = sequelize.define('Photo', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  propertyId: { type: DataTypes.UUID, allowNull: false },
  url: DataTypes.STRING
});

module.exports = Photo;