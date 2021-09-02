'use strict';

const Arrowverse = require('../franchies/arrowverse/titles/titles.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('titles', Arrowverse, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('titles', null, {});
  }
};