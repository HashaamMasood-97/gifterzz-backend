const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./auth.model");

users.use(cors());

process.env.SECRET_KEY = "secret";

//register

let errr = 0;
users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    full_name: req.body.full_name,
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
              res.json({
                header: {
                  error: errr,
                  message: "Registered successfully",
                },
                body: {
                  _id: user._id,
                  full_name: user.full_name,
                  email: user.email,
                  created: today,
                },
              });
            })
            .catch((err) => {
              if (!req.body.password && !req.body.email) {
                let e = errr + 2;
                res.json({
                  header: {
                    error: e,
                    message: "Email and Password Not Found",
                  },
                });
              } else if (!req.body.password) {
                let e = errr + 1;
                res.json({
                  header: {
                    error: e,
                    message: "Password Not Found",
                  },
                });
              } else if (!req.body.email) {
                let e = errr + 1;
                res.json({
                  header: {
                    error: e,
                    message: "Email Not Found",
                  },
                });
              } else {
                let e = errr + 1;
                res.json({
                  header: {
                    error: e,
                    message: err,
                  },
                });
              }
            });
        });
      } else {
        let e = errr + 1;
        res.json({
          header: {
            error: e,
            message: "User Already Exist",
          },
        });
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
            full_name: user.full_name,
            email: user.email,
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY);
          /*    let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })  */
          res.json({
            header: {
              error: errr,
              message: "logged in successfully",
            },
            body: {
              _id: user._id,
              first_name: user.first_name,
              last_name: user.last_name,
              phone: user.phone,
              gender: user.gender,
              email: user.email,
              token: token,
            },
          });
        } else {
          // Passwords don't match
          let e = errr + 1;
                res.json({
                  header: {
                    error: e,
                    message: "Password Does Not Match",
                  },
                });
        }
      } else {
        let e = errr + 1;
        res.json({
          header: {
            error: e,
            message: "User doesn't exist",
          },
        });
      }
    })
    .catch((err) => {
      if (!req.body.email) {
        let e = errr + 1;
        res.json({
          header: {
            error: e,
            message: "Email Not Found",
          },
        });
      } else if (!req.body.password) {
        let e = errr + 1;
        res.json({
          header: {
            error: e,
            message: "Password Not Found",
          },
        });
      } else {
        let e = errr + 1;
        res.json({
          header: {
            error: e,
            message: err,
          },
        });
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
