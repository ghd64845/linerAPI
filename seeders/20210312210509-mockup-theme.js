'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('colors', [
      { themeId: 1, colorHex: '#ffff8d' },
      { themeId: 1, colorHex: '#a5f2e9' },
      { themeId: 1, colorHex: '#ffd5c8' },
      { themeId: 2, colorHex: '#f6f0aa' },
      { themeId: 2, colorHex: '#d3edd1' },
      { themeId: 2, colorHex: '#f9d6c1' },
      { themeId: 3, colorHex: '#f4ff40' },
      { themeId: 3, colorHex: '#8affd7' },
      { themeId: 3, colorHex: '#ffc477' },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('colors', null, {});
  },
};
