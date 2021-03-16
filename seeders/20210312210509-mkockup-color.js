'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('themes', [
      { themeName: 'Basic' },
      { themeName: 'Basic2' },
      { themeName: 'Basic3' },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('themes', null, {});
  },
};
