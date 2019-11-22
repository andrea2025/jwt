const bcrypt = require("bcryptjs");
const User = require("../models/user");
const  jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

const registerX = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email }, (err, data) => {
    if (data) {
      return res.status(400).json("user already exist");
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          const newUser = new User({
            name,
            password: hash, 
            email
          });
          newUser.save(err => {
            if (err) {
              return next(err);
            } else {
              return res
                .status(201)
                .json({ success: true, message: "Create user successful" });
            }
          });
        });
      });
    }
  });
};

const loginX = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, data) => {
    if (err) {
      next(err);
    }
    if (!data) {
      return res.status(404).json({
        message: "Invalid, create an account first"
      });
    } else {
      bcrypt.compare(password, data.password, (err, data) => {
        if (!data) {
          return res.status(403).json({
            message: "Wrong email/password"
          });
        } else {
          const token = jwt.sign({isAdmin: data.isAdmin},process.env.SECRET_WORD,{expiresIn: '6h'})
          return res.status(200).json({
            message: "Login approved",
            token
            
          });
        }
      });
    }
  });
};

const total = (req, res, next) => {
  User.find({}, (err, data, next) => {
    if (err) next(next);
    else return res.status(200).json({
      message:"updated succefully",
       data });
  });
};

const upDate = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { isAdmin: true, password: false },
    err => {
      if (err) return res.status(500).send({ error: "unsuccessful" });
      return res.send({ success: "success" });
    }
  );
};




module.exports = { registerX, loginX, total, upDate };
