var express = require('express');
var router = express.Router();
var AuthenticationMiddleware = require('../middleware/Authentication.middleware');
var UserController = require('../controller/User.Controller');

router.get("/myTasks",AuthenticationMiddleware.autheticate,UserController.myTask);

module.exports = router;