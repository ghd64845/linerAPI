module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'theme',
    {
      themeName: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: false,
    },
  );
