'use strict';

const groups = require('../franchies/arrowverse/groups/groups.json');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('groups', groups, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('groups', null, {});
  }
};
