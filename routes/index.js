/* 
Filename: index.js
Student Name: Juan Carlo Soriano
Student Number: 301262744
Date: June 7, 2023
*/

let express = require("express");
let router = express.Router();
let passport = require("passport");
let UserModel = require("../models/user");

/* GET home page. */
router.get("/", async (req, res, next) => {
  // For assignment purposes only
  let user = await UserModel.User.findOne({});

  if (!user) {
    let newUser = new UserModel.User({
      username: "juancarlo",
      email: "juancarlo@express.com",
    });

    UserModel.User.register(newUser, "Express123", (err) => {
      if (err) {
        console.log("Error: inserting new user");
      }
    });
  }

  console.log("isAuthenticated?", req.isAuthenticated());
  res.render("index", {
    title: "Juan Carlo's Portfolio",
    isAuthenticated: req.isAuthenticated(),
  });
});

/* GET about me page. */
router.get("/about-me", function (req, res, next) {
  res.render("about-me", { isAuthenticated: req.isAuthenticated() });
});

/* GET contact me page. */
router.get("/contact-me", function (req, res, next) {
  res.render("contact-me", { isAuthenticated: req.isAuthenticated() });
});

/* GET projects page. */
router.get("/projects", function (req, res, next) {
  res.render("projects", { isAuthenticated: req.isAuthenticated() });
});

/* GET services page. */
router.get("/services", function (req, res, next) {
  res.render("services", { isAuthenticated: req.isAuthenticated() });
});

/* GET login page. */
router.get("/login", function (req, res, next) {
  // Check if the user is alreadt logged in
  if (!req.user) {
    res.render("auth/login", {
      messages: req.flash("loginMessage"),
      isAuthenticated: req.isAuthenticated(),
    });
  } else {
    res.redirect("/");
  }
});

/* POST login */
router.post("/login", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      next(err);
    }
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      res.redirect("/login");
    } else {
      req.login(user, (err) => {
        // Server error
        if (err) {
          next(err);
        } else {
          res.redirect("/");
        }
      });
    }
  })(req, res, next);
});

/* GET logout */
router.get("/logout", function (req, res, next) {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
