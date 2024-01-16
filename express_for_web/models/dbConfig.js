const { Sequelize } = require("sequelize");
var config = require('../config/config');

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "mysql",
  pool: {
    max: config.connectionLimit,
    idle: 30000,
  },
});

module.exports = sequelize;