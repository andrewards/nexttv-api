'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class titles_groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      titles_groups.belongsTo(models.titles, {
        foreignKey: 'title_id',
      });
      titles_groups.belongsTo(models.groups, {
        foreignKey: 'group_id',
      });
    }
  };
  titles_groups.init({
    season: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'titles_groups',
  });
  return titles_groups;
};