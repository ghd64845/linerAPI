'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.js'))[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Color = require('./color')(sequelize, Sequelize);
db.Theme = require('./theme')(sequelize, Sequelize);
db.Highlight = require('./highlight')(sequelize, Sequelize);
db.Page = require('./page')(sequelize, Sequelize);

db.Theme.hasOne(db.User);
db.User.belongsTo(db.Theme, { foreignKey: { defaultValue: 1 } });
db.Theme.hasMany(db.Color);
db.Color.belongsTo(db.Theme);
db.User.hasMany(db.Page);
db.Page.belongsTo(db.User);
db.Page.hasMany(db.Highlight);
db.Highlight.belongsTo(db.Page);

module.exports = db;
