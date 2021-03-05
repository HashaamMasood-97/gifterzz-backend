const express = require("express");
const product = express.Router();
const cors = require("cors");
const productSchema = require("./product.model");

product.use(cors());

//get all products
product.get("/product/get", (req, res) => {
  productSchema.find(function (err, gift) {
    if (err) {
      console.log(err);
    } else {
      res.json(gift);
    }
  });
});

//post products
product.route("/product/post").post(function (req, res) {
  let products = new productSchema(req.body);
  products
    .save()
    .then((product) => {
      res.status(200).json({ Product: "added successfully" });
    })

    .catch((err) => {
      res.status(400).send("adding new form failed");
    });
});

module.exports = product;
