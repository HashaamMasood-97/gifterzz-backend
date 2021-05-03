const express = require("express");
const order = express.Router();
const cors = require("cors");
const orderSchema = require("./order.model");

order.use(cors());

  
order.route('/order/post').post(function(req, res){
   
    const r = new orderSchema({
        c_name: req.body.c_name,
        c_id: req.body.c_id,
        c_email: req.body.c_email,
        totalQty: req.body.totalQty,
        totalPrice: req.body.totalPrice,
        products: req.body.products
    })
      
 
      /*  products: [
          { id: req.body.id, name: req.body.name, qty: req.body.qty, price: req.body.price }
        ]
      }); */

      r.save()
        .then(orders => {
            res.status(200).json({'Order': 'added successfully'});
 
         })
 
         .catch(err=> {
              res.status(400).send('adding new Order failed');
         });
 
 });

module.exports = order;






