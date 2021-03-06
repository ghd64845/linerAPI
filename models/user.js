module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'user',
    {
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
    },
    {
      pranoid: true,
      timestamps: true,
    },
  );
