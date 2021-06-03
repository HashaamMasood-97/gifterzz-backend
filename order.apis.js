const express = require("express");
const order = express.Router();
const cors = require("cors");
const orderSchema = require("./order.model");

order.use(cors());

order.route("/order/post").post(function (req, res) {
  var today = new Date();
  var year=today.getFullYear();
  var mon=today.getMonth();
  var day=today.getDay();
  var dat=mon+"-"+day+"-"+year
  const r = new orderSchema({
    c_name: req.body.c_name,
    c_id: req.body.c_id,
    c_email: req.body.c_email,
    c_contact: req.body.c_contact,
    c_address: req.body.c_address,
    totalQty: req.body.totalQty,
    totalPrice: req.body.totalPrice,
    products: req.body.products,
    date: dat
  });

  r.save()
    .then((orders) => {
      res.status(200).json({ Order: "added successfully" });
    })

    .catch((err) => {
      res.status(400).send("adding new Order failed");
    });
});

//get orders
order.get("/order/get", (req, res) => {
  orderSchema.find(function (err, gift) {
    if (err) {
      console.log(err);
    } else {
      res.json(gift);
    }
  });
});

//orders by user id
order.route("/order/gets/:id").get(function (req, res) {
  //accessing parameter for url
  orderSchema.find({ c_id: req.params.id }, function (err, homemedics) {
    res.json(homemedics);
  });
});





module.exports = order;
