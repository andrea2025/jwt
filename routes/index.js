const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/token');
const controllerX = require("../controllers/user");


router.get("/", function(req, res, next) {
  res.status(200).json({ 
    message: "welcome on board"
  });
});



router.post("/register", controllerX.registerX);
router.post("/login", controllerX.loginX);
router.post("/total", controllerX.total);

//router.put("/upDate/:id", controllerX.upDate);

module.exports = router;
