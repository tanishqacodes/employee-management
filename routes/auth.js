var express = require('express');
var router = express.Router();
var User = require("../models/User.model");
var bcrypt = require("bcrypt");

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

  // hashed password , password
  let isPasswordMatched = await bcrypt.compare(password,ifUserFounded.password);

  if(!isPasswordMatched){
    return res.send("Password incorrect");
  }

  return res.send({
    status : "success",
    data : ifUserFounded
  });

  // if (ifUserFounded.password != hashedPasswordlogin) {
  //   return res.send("Password is incorrect");
  // }
  // return res.send("login successfully");
});

router.post("/register",async (req,res)=>{
  // input from the user thorugh frontend
  var { email, employeeName , phoneNumber , dob , password , username } =req.body;

  // check if user already exists !!!
  let ifUserFounded = await User.findOne({ email: email });
  console.log("Usser : ", ifUserFounded);

  if (ifUserFounded) {     //null === false => true
    return res.send("User already exists");
  }

  // hashing => 10 by default (salt)
  let hashedPassword = await bcrypt.hash(password,10);

  // instance creation => key : value pair
  let user = new User({
    email : email,
    employeeName : employeeName,
    phoneNumber : phoneNumber,
    dob : dob,
    password : hashedPassword,
    userName : username
  });
  // save into variable
  let dataSaved = await user.save();

  if(dataSaved){
    return res.send("User registered successfully ....");
  }
  else{
    return res.send("Something went wrong user is not registered due to error...");
  }
});


module.exports = router;
