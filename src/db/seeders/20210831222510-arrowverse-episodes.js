'use strict';

const episodes = require('../franchies/arrowverse/episodes/episodes.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('episodes', episodes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('episodes', null, {});
  }
};
