const User = require('../models/user');
const  jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

module.exports = (req,res, next) =>{
    //console.log(req.headers.authorization)
  const authorization = req.headers.authorization
  if(!authorization) {
    return res.status(401).json({
      message:"No authorization  headers found"
    })
  } else{
      const token = authorization.split('')[1];
      jwt.verify(token, process.env.SECRET_WORD, (err, decoded) =>{
        if(err){
            return next(err);
        }else{
          req.admin = decoded.isAdmin
          next();
        }
  });

}
}