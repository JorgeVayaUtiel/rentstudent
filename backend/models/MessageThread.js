const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MessageThread = sequelize.define('MessageThread', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  propertyId: { type: DataTypes.UUID, allowNull: false },
  ownerId: { type: DataTypes.UUID, allowNull: false },
  studentId: { type: DataTypes.UUID, allowNull: false }
});

module.exports = MessageThread;
//dsfhidhfuh