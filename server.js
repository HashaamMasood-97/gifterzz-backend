const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
//const giftRoutes = express.Router();
const PORT = 3700;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/gift", {
  useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established");
});

app.use("/uploads", express.static("uploads"));

var contact = require("./contactApis");
app.use("/gift", contact);

var product = require("./productApis");
app.use("/gift", product);

var auth = require("./authApis");
app.use("/gift", auth);


app.listen(PORT, function () {
  console.log("Server in running on PORT " + PORT);
});
