const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new Schema({
  name: {
    type: String,
  },

  price: {
    type: String,
  },

  quantity: {
    type: String,
  },

  description: {
    type: String,
  },
});

module.exports = mongoose.model("product", productSchema);