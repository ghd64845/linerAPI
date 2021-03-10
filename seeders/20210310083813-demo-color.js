'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('colors', [
      { colorHex: '#ffff8d' },
      { colorHex: '#a5f2e9' },
      { colorHex: '#ffd5c8' },
      { colorHex: '#f6f0aa' },
      { colorHex: '#d3edd1' },
      { colorHex: '#f9d6c1' },
      { colorHex: '#f4ff40' },
      { colorHex: '#8affd7' },
      { colorHex: '#ffc477' },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('colors', null, {});
  },
};
