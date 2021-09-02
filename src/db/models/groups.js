'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      groups.belongsTo(models.franchies, {
        foreignKey: 'franch_id',
      });
      groups.hasMany(models.titles_groups, {
        foreignKey: 'group_id',
      });
    }
  };
  groups.init({
    name: DataTypes.STRING(30),
  }, {
    sequelize,
    modelName: 'groups',
  });
  return groups;
};