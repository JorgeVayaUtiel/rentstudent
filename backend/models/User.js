const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  passwordHash: DataTypes.STRING,
 role: {
  type: DataTypes.ENUM('owner', 'student'),
  allowNull: false,
  defaultValue: 'student'
},

  profilePhoto: DataTypes.STRING,
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  authProvider: {
    type: DataTypes.STRING,
    defaultValue: 'local'
  }
});

module.exports = User;



