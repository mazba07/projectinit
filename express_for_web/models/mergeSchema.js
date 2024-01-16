var sequelize = require("./dbConfig");
sequelize
  .sync({ force: true })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

var dbQuery = require("../models/dbQuery");
var user = require("../models/user");
var userPhoto = require("../models/userPhoto");
