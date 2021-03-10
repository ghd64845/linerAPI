module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'highlight',
    {
      userId: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      pageId: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      colorHex: {
        type: DataTypes.STRING(7),
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT(),
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    },
  );
