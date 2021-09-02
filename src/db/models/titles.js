'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class titles extends Model {
    static associate(models) {
      titles.belongsTo(models.franchies, {
        foreignKey: 'franch_id',
      });titles.hasMany(models.episodes, {
        foreignKey: 'show_id',
      });
      titles.hasMany(models.watches, {
        foreignKey: 'title_id',
      });
      titles.hasMany(models.titles_groups, {
        foreignKey: 'title_id',
      });
    }
  };
  titles.init({
    id_tmdb: DataTypes.INTEGER,
    name: DataTypes.STRING(30),
    photo: DataTypes.TEXT,
    description: DataTypes.TEXT,
    type: DataTypes.ENUM("show", "film"),
    
  }, {
    sequelize,
    modelName: 'titles',
  });
  return titles;
};