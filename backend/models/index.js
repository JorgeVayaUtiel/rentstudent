const User = require('./User');
const Property = require('./Property');
const Photo = require('./Photo');
const Amenity = require('./Amenity');
const MessageThread = require('./MessageThread');
const Message = require('./Message');

User.hasMany(Property, { foreignKey: 'userId' });
Property.belongsTo(User, { foreignKey: 'userId' });

Property.hasMany(Photo, { foreignKey: 'propertyId' });
Photo.belongsTo(Property, { foreignKey: 'propertyId' });

Property.belongsToMany(Amenity, { through: 'PropertyAmenities', foreignKey: 'propertyId' });
Amenity.belongsToMany(Property, { through: 'PropertyAmenities', foreignKey: 'amenityId' });

Property.hasMany(MessageThread, { foreignKey: 'propertyId' });
MessageThread.belongsTo(Property, { foreignKey: 'propertyId' });

User.hasMany(MessageThread, { foreignKey: 'ownerId', as: 'OwnerThreads' });
User.hasMany(MessageThread, { foreignKey: 'studentId', as: 'StudentThreads' });
MessageThread.belongsTo(User, { foreignKey: 'ownerId', as: 'Owner' });
MessageThread.belongsTo(User, { foreignKey: 'studentId', as: 'Student' });

MessageThread.hasMany(Message, { foreignKey: 'threadId' });
Message.belongsTo(MessageThread, { foreignKey: 'threadId' });

User.hasMany(Message, { foreignKey: 'senderId' });
Message.belongsTo(User, { foreignKey: 'senderId' });

module.exports = { User, Property, Photo, Amenity, MessageThread, Message };
