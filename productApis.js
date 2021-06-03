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

//get product category wise

product.get("/product/chocolate", (req, res) => {
  //accessing parameter for url
  productSchema.find({ category: "Chocolates" }, function (err, gift) {
    res.json(gift);
  });
});

product.get("/product/fashion", (req, res) => {
  //accessing parameter for url
  productSchema.find({ category: "Fashion Accessories" }, function (err, gift) {
    res.json(gift);
  });
});

//

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

//post products
product
  .route("/product/post")
  .post(upload.single("photo"), function (req, res) {
    const name = req.body.name;
    const category = req.body.category;
    const priceOne = req.body.priceOne;
    const priceTwo = req.body.priceTwo;
    const description = req.body.description;
    const photo = req.file.path;

    const productData = {
      name,
      category,
      priceOne,
      priceTwo,
      description,
      photo,
    };

    const products = new productSchema(productData);

    products
      .save()
      .then((product) => {
        res.status(200).json({ Product: "added successfully" });
      })

      .catch((err) => {
        res.status(400).send("adding new product failed");
      });
  });

module.exports = product;
