'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.hasMany(models.watches, {
        foreignKey: 'user_id',
      });
    }
  };
  users.init({
    name: DataTypes.STRING(20),
    username: DataTypes.STRING(20),
    password: DataTypes.STRING(255),
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};