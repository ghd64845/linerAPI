module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'theme',
    {
      themeId: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: false,
    },
  );
