const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new Schema({
  name: {
    type: String,
  },

  category: {
    type: String,
  },

  priceOne: {
    type: String,
  },

  priceTwo: {
    type: String,
  },


  description: {
    type: String,
  },

  photo: {
    type: String,
  }
});

module.exports = mongoose.model("product", productSchema);