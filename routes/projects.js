/* 
Filename: projects.js
Student Name: Juan Carlo Soriano
Student Number: 301262744
Date: June 7, 2023
*/

var express = require("express");
var router = express.Router();

/* GET projects page. */
router.get("/", function (req, res, next) {
  res.render("projects", {});
});

module.exports = router;
