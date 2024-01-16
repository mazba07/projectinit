var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var config = require("./config/config");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
var http = require("http").Server(app);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var sess = {
  secret: "mazba09@gmail.com",
  cookie: {},
  resave: false,  // don't save session if unmodified
  saveUninitialized: false  // don't create session until something stored
};
if ("1" === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
  sess.cookie.maxAge = 60*60 ;
}
app.use(session(sess));

app.use(function (req, res, next) {
  res.locals.userSession = req.session;
  res.locals.baseUrl = config.baseUrl;
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// module.exports = app;

var port = 3000;
http.listen(port, function () {
  console.log("server is running on port : " + port);
});
