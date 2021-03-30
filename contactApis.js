const express = require("express");
const contact = express.Router();
const cors = require("cors");
const contactSchema = require("./contact.model");
let path = require('path');

contact.use(cors());



//var Image = require("./images");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    // rejects storing a file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

//post contacts
contact
  .route("/contact/post")
  .post(upload.single('photo'), function (req, res) {
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const message = req.body.message;
    const photo = req.file.path;

    const contactData = {
      name,
      address,
      phone,
      message,
      photo
    };

    const contact = new contactSchema(contactData);

    contact
      .save()
      .then((contacts) => {
        res.status(200).json({ Form: "added successfully" });
      })

      .catch((err) => {
        res.status(400).send("adding new form failed");
      });
  });

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

module.exports = contact;
