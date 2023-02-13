var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  console.log(req);
  res.send('users!!');
  res.send('respond with a resource');
});

router.get('/get', function(req, res, next) {

  res.send('users/get!!');
  res.send('respond with a resource');
});

module.exports = router;
