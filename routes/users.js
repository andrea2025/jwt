var express = require('express');
var router = express.Router();
//const user = require('../models/user')
const verifyToken = require('../middleware/token');
const controller = require("../controllers/getUser");

/* GET users listing. */
router.get('/', verifyToken,  controller.getAllUser);
//router.put('/:id', verifyToken,  controllerX.upDateUser);
  
 


module.exports = router;
