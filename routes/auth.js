var express = require('express');
var router = express.Router();
var User = require("../models/User");


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', async (req, res) => {
  var { email, password } = req.body;
  let ifUserFounded = await User.findOne({ email: email });
  console.log("Usser : ", ifUserFounded);

  if (!ifUserFounded) {     //null === false => true
    return res.send("User not found");
  }
  if (ifUserFounded.password != password) {
    return res.send("Password is incorrect");
  }
  return res.send("login successfully");
});

module.exports = router;
