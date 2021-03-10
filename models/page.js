module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'page',
    {
      pageUrl: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
    },
    {
      paranoid: true,
      timestamps: false,
    },
  );
