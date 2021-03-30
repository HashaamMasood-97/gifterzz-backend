const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let contactSchema = new Schema({
  name: {
    type: String,
  },

  address: {
    type: String,
  },

  phone: {
    type: String,
  },

  message: {
    type: String,
  },

  photo: {
    type: String,
  }
});

module.exports = mongoose.model("contact", contactSchema);
