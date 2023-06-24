/* 
Filename: contact.js
Student Name: Juan Carlo Soriano
Student Number: 301262744
Date: June 7, 2023
*/
var express = require("express");
var router = express.Router();

let mongoose = require("mongoose");
var ObjectId = require("mongoose").Types.ObjectId;
let Contact = require("../models/contact");

let passport = require("passport");

/* Helper function to guard routes */
const requireAuth = (req, res, next) => {
  // Check if user is logged in
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }
  next();
};

/* GET contacts page. */
router.get("/", requireAuth, async (req, res, next) => {
  const contacts = await Contact.find({});

  try {
    res.render("contact/list", {
      contacts: contacts,
      isAuthenticated: req.isAuthenticated(),
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/edit/:id", requireAuth, async (req, res, next) => {
  const id = req.params.id;
  const contact = await Contact.findOne({ _id: id });

  try {
    res.render("contact/edit", {
      contact: contact,
      isAuthenticated: req.isAuthenticated(),
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/edit/:id", requireAuth, async (req, res, next) => {
  const id = req.params.id;

  const updatedContact = Contact({
    _id: id,
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
  });

  Contact.updateOne({ _id: id }, requireAuth, updatedContact)
    .then(async () => {
      res.redirect("/contact");
    })
    .catch(async (err) => {
      const contact = await Contact.findOne({ _id: id });
      res.render("contact/edit", {
        contact: contact,
        isAuthenticated: req.isAuthenticated(),
      });
    });
});

/* GET delete contacts */
router.get("/delete/:id", requireAuth, async (req, res, next) => {
  const id = req.params.id;

  const contact = await Contact.findOne({ _id: id });

  Contact.deleteOne({ _id: id }).then(async () => {
    res.redirect("/contact");
  });
});

module.exports = router;
