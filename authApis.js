const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("./auth.model");

users.use(cors());

process.env.SECRET_KEY = "secret";

//register
users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
    gender: req.body.gender,
    email: req.body.email,
    password: req.body.password,
    created: today,
  };
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ status: user.email + "! Registered" });
            })
            .catch((err) => {
              if (!req.body.email || !req.body.password) {
                res.send("Error: Email or Password not found");
              } else {
                res.send("error :" + err);
              }
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

//login
users.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone,
            gender: user.gender,
            email: user.email,
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY);
          /*    let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })  */
          res.send(
            "Jwt token: \n " +
              token +
              "\n status: " +
              user.first_name +
              " " +
              user.last_name +
              "!  Logged In"
          );
        } else {
          // Passwords don't match
          res.json({ error: "User does not exist" });
        }
      } else {
        res.json({ error: "User does not exist" });
      }
    })
    .catch((err) => {
        if (!req.body.email || !req.body.password) {
          res.send("Error: Email or Password not found");
        } else {
          res.send("error :" + err);
        }
    });
});

//user profile
users.get("/profile", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );
  User.findOne({
    _id: decoded._id,
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.send("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = users;
