'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class watches extends Model {
    static associate(models) {
      watches.belongsTo(models.users, {
        foreignKey: 'user_id',
      });
      watches.belongsTo(models.titles, {
        foreignKey: 'title_id',
      });
      watches.belongsTo(models.episodes, {
        foreignKey: 'episode_id',
      });
    }
  };
  watches.init({
    
  }, {
    sequelize,
    modelName: 'watches',
  });
  return watches;
};