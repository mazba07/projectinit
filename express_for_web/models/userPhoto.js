const { Sequelize, DataTypes } = require("sequelize");

var sequelize = require("./dbConfig");

const userPhoto = sequelize.define("userPhoto", {
  photoId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  photoStr: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

module.exports = userPhoto;
