'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('episodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      show_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'titles',
          key: 'id',
        },
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      season: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
        unsigned: true,
      },
      episode: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
        unsigned: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      when: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('episodes');
  }
};