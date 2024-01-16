var express = require("express");
var router = express.Router();
var formidableMiddleware = require("express-formidable");
router.use(formidableMiddleware());

// var dbQuery = require("../models/dbQuery");
// var user = require("../models/user");
// var userPhoto = require("../models/userPhoto");
var userAuth = require("../controllers/userAuth");

/* GET home page. */
router.get("/", function (req, res, next) {
  async function main() {
    res.render("pages/home/home.ejs");
  }
  main();
});

router.all("/login", userAuth.login);
router.get("/logout", userAuth.logout);
router.get("/session-display", userAuth.sessionDisplay);

module.exports = router;
