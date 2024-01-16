const { Sequelize, DataTypes } = require("sequelize");

var sequelize = require("./dbConfig");

const user = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userEmail: {
    type: DataTypes.TEXT,
  },
  userPassword: {
    type: DataTypes.TEXT,
  },
  isActive: {
    type: DataTypes.INTEGER,
  },
  userIp: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

module.exports = user;
