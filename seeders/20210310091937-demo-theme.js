'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('themes', [
      { themeId: 1, colorId: 1 },
      { themeId: 1, colorId: 2 },
      { themeId: 1, colorId: 3 },
      { themeId: 2, colorId: 4 },
      { themeId: 2, colorId: 5 },
      { themeId: 2, colorId: 6 },
      { themeId: 3, colorId: 7 },
      { themeId: 3, colorId: 8 },
      { themeId: 3, colorId: 9 },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('themes', null, {});
  },
};
