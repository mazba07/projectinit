var md5 = require("md5");
let Validator = require("validatorjs");

var config = require("../config/config");

var user = require("../models/user");

var login = function (req, res, next) {
  async function main() {
    var data = [];
    data["validationErrors"] = false;

    if (req.method == "POST") {
      let dataValidate = {
        userEmail: req.fields.userEmail,
        userPassword: req.fields.userPassword
      };

      let rules = {
        userEmail: "required|max:50|email",
        userPassword: "required"
      };

      let validation = new Validator(dataValidate, rules);

      if (validation.passes()) {
        var newUserData = {
          userEmail: req.fields.userEmail,
          userPassword: md5(req.fields.userPassword),
          isActive: 0,
        };
        const newUser = await user.create(newUserData);
        var sessionData = {
          userId: newUser.id,
          userName: newUser.userEmail,
          isActive: newUser.isActive,
        };
        req.session.sessionData = sessionData;
        res.redirect(config.baseUrl);
      } else {
        data["validationErrors"] = validation.errors;
        res.render("pages/userAuth/login.ejs", data);
      }
    } else {
      res.render("pages/userAuth/login.ejs", data);
    }
  }
  main();
};

var logout = function (req, res, next) {
  async function main() {
    req.session.destroy(function (err) {
      res.redirect(config.baseUrl);
    });
  }
  main();
};

var sessionDisplay = function (req, res, next) {
  async function main() {
    console.log(req.session);
    res.send("session");
  }
  main();
};

module.exports = {
  login,
  logout,
  sessionDisplay,
};
