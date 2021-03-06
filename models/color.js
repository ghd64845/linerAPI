module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'color',
    {
      colorHex: {
        type: DataTypes.STRING(7),
        allowNull: false,
        unique: true,
      },
    },
    {
      pranoid: true,
      timestamps: false,
    },
  );
