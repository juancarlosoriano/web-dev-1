/* 
Filename: index.js
Student Name: Juan Carlo Soriano
Student Number: 301262744
Date: June 7, 2023
*/

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Juan Carlo's Portfolio" });
});

module.exports = router;
