'use strict';

const Arrowverse = require('../franchies/arrowverse/watches/watches.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('watches', Arrowverse, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('watches', null, {});
  }
};