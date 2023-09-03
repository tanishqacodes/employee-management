var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  return res.send({
    "hello :" : "tanishqa",
    "hello :" : "world",
    "hiii :" : "sid",
    "hello :" : "tanishqa",
  });
});

module.exports = router;
