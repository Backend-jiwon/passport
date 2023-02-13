var express = require('express');
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var db = require('./db');
var router = express.Router();


passport.use(new Strategy(
  function(token, cb) {
    
    db.findByToken(token, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  }));

express().use(require('morgan')('combined'));

/* GET home page. */
router.get('/', function(req, res) {
  //
  var user_list=db.getAll();
  res.json(user_list);
  
});

router.get('/:id',function(req,res){
  //
  const id=parseInt(req.params.id,10);
  var name=db.getname(id);
  res.json(name);
  
})

router.put('/:id/:token/:name', function(req, res) {
  //
  const id=parseInt(req.params.id,10), token=req.params.token, name=req.params.name;
  
  db.add(id, token, name);
  res.send('Welcome '+id +'!!');
});

router.patch('/:newname',
  passport.authenticate('bearer', { session: false }),
  function(req, res){
    
    var id = req.user.id, newname=req.params.newname;

    var well = db.change(id,newname);
    
    if(well)
      res.json('now '+id+' is '+newname);
    else
      res.json('error: no such id');
})

router.delete('/',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {

    const id = req.user.id;
    
    var well = db.del(id);
    if(well) 
      res.json(id+' is deleted');
    else 
      res.json('error: no such id');
  });







module.exports = router;
