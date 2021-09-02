'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class franchies extends Model {
    static associate(models) {
      franchies.hasMany(models.titles, {
        foreignKey: 'franch_id',
      });
      franchies.hasMany(models.groups, {
        foreignKey: 'franch_id',
      });
    }
  };
  franchies.init({
    name: DataTypes.STRING(20),
    photo: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'franchies',
  });
  return franchies;
};