var express = require('express');
var router = express.Router();
// var User = require("../models/User.model");
// var bcrypt = require("bcrypt");

const AuthController = require("../controller/Authentication.Controller");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', AuthController.loginUser

  // if (ifUserFounded.password != hashedPasswordlogin) {
  //   return res.send("Password is incorrect");
  // }
  // return res.send("login successfully");
);

router.post("/register", AuthController.registerUser
  // input from the user thorugh frontend
);


module.exports = router;
