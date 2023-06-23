/* 
Filename: app.js
Student Name: Juan Carlo Soriano
Student Number: 301262744
Date: June 7, 2023
*/

let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let mongoose = require("mongoose");

/* Modules for authentication */
let passport = require("passport");
let session = require("express-session");
let passportLocal = require("passport-local");
let LocalStrategy = passportLocal.Strategy;
let flash = require("connect-flash");

let indexRouter = require("./routes/index");
let contactRouter = require("./routes/contact");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set up mongoose
var db = require("./config/db");

// Mongoose connected to the URI
mongoose.connect(db.URI);

// Bind mongoose to connection
let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection error:"));
mongoDB.once("open", () => {
  console.log("Connected to MongoDB...");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* Configure Express sessions */
app.use(
  session({
    secret: "keyboard cat",
    saveUninitialized: false,
    resave: false,
  })
);

/* Initialize flash */
app.use(flash());

/* Configure Passport */
app.use(passport.initialize());
app.use(passport.session());

/* Passport User Configuration */

// Create User model instance
let userModel = require("./models/user");
let User = userModel.User;

// Set local strategy
// passport.use(new LocalStrategy(User.authenticate()));

// const local = new LocalStrategy((username, password, done) => {
//   User.findOne({ username })
//     .then((user) => {
//       if (!user || !user.validPassword(password)) {
//         done(null, false, { message: "Invalid username/password" });
//       } else {
//         done(null, user);
//       }
//     })
//     .catch((e) => done(e));
// });
// passport.use("local", local);

passport.use(new LocalStrategy(User.authenticate()));

// Serialize and Deserialize User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", indexRouter);
app.use("/contact", contactRouter);

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

// Mongoose Model
//const User = mongoose.model('User', { name: String, password: String });

module.exports = app;
