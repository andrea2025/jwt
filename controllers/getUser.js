const User = require('../models/user');

const getAllUser = (req,res,next)=>{
    User.find((err, data) => {
     // req.user = {isAdmin:decoded.isAdmin}
        if (err) return next (err)
        res.status(200).json({
          message:"users return successfully",
          data
        })
       
      })
}

const upDateUser = (req,res,next) =>{
  if(!req.admin){
    return res.status(401).json({
      message:"you need to be an admin"
    })
  } else{
    User.findOneAndUpdate(req.params.id,{name:req.body.name}, (err) =>{
      if(err) {
        return next(err);
      }else{
        return res.status(200).json({
          message:"user updated successfully"
        })
      }
    })
  }
}


module.exports = {getAllUser, upDateUser}