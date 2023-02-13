var express = require('express');
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var ids = require('./iiiiddd');
var router = express.Router();


passport.use(new Strategy(
  function(token, cb) {
    db.users.findByToken(token, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  }));

express().use(require('morgan')('combined'));

/* GET home page. */
router.get('/', function(req, res, next) {
  //

  var user_list=ids.getAll();
  res.json(user_list);
  
});

router.get('/:id',function(req,res){
  //
  const id=parseInt(req.params.id,10);
  var name=ids.getname(id);
  res.json(name);
  
})

router.put('/:id/:token/:name', function(req, res, next) {
  //
  const id=parseInt(req.params.id,10), token=parseInt(req.params.token,10), name=req.params.name;
  console.log(id,token,name);

  ids.add(id ,token ,name);
  res.send('new id added');
});

router.patch('/:id/:token/:newname', function(req, res, next){
  console.log(req);

})

router.delete('/:id/:token', passport.authenticate('bearer', { session: false }), function(req, res, next) {
  //
  //const id=parseInt(req.params.id,10);
  //ids.del(req);
  console.log(id);
  res.send('delete!!');
  
});





module.exports = router;
