module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'color',
    {
      colorId: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      colorHex: {
        type: DataTypes.STRING(7),
        allowNull: false,
        unique: true,
      },
    },
    {
      pranoid: false,
      timestamps: false,
    },
  );
