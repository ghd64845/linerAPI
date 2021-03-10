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
db.User.belongsTo(db.Theme);
db.Color.hasMany(db.Theme);
db.Theme.belongsTo(db.Color);
db.User.hasMany(db.Highlight);
db.Highlight.belongsTo(db.User);
db.Page.hasOne(db.Highlight);
db.Highlight.belongsTo(db.Page);

module.exports = db;
