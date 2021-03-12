module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'page',
    {
      pageUrl: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: false,
    },
  );
