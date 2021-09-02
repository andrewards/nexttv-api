'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class episodes extends Model {
    static associate(models) {
      episodes.belongsTo(models.titles, {
        foreignKey: 'show_id',
      });episodes.hasMany(models.watches, {
        foreignKey: 'episode_id',
      });
    }
  };
  episodes.init({
    name: DataTypes.STRING(50),
    season: DataTypes.INTEGER,
    episode: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    when: DataTypes.DATEONLY,
  }, {
    sequelize,
    modelName: 'episodes',
  });
  return episodes;
};