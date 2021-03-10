module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'user',
    {
      userId: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      nick: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      themeId: {
        type: DataTypes.INTEGER(),
        allowNull: true,
      },
    },
    {
      pranoid: false,
      timestamps: true,
    },
  );
