const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let orderSchema = new Schema({
  c_name: {
    type: String,
  },

  c_email: {
    type: String,
  },

  c_id: {
    type: String,
  },

  
  c_address: {
    type: String,
  },

  
  c_contact: {
    type: String,
  },

  totalQty: {
    type: String,
  },


  totalPrice: {
    type: String,
  },

  products: [{
    
    id:{
        type:String
    },

    item:{
        type:String
    },

    price:{
        type:String
    },

    quantity:{
        type:String
    },
  }]
});

module.exports = mongoose.model("order", orderSchema);