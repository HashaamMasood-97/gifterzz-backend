const express = require("express");
const contact = express.Router();
const cors = require("cors");
const contactSchema = require("./contact.model");

contact.use(cors());

//get all contacts
contact.get("/contact/get", (req, res) => {
  contactSchema.find(function (err, gift) {
    if (err) {
      console.log(err);
    } else {
      res.json(gift);
    }
  });
});

//post contacts
contact.route("/contact/post").post(function (req, res) {
  let contacts = new contactSchema(req.body);
  contacts
    .save()
    .then((contacts) => {
      res.status(200).json({ Form: "added successfully" });
    })

    .catch((err) => {
      res.status(400).send("adding new form failed");
    });
});

module.exports = contact;
