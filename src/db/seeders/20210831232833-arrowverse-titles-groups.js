'use strict';

const titles_groups = require('../franchies/arrowverse/groups/titles_groups.json');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('titles_groups', titles_groups, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('titles_groups', null, {});
  }
};
