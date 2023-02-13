var express = require('express');
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var db = require('./db');
var router = express.Router();

//db에 토큰 일치하는 user 존재하는지 확인
passport.use(new Strategy(
  function(token, cb) {
    
    db.findByToken(token, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  }));

express().use(require('morgan')('combined'));

//모든 user id, 이름 출력
router.get('/', function(req, res) {
  //
  var user_list=db.getAll();
  res.json(user_list);
  
});

//id로 이름 검색
router.get('/:id',function(req,res){
  //
  const id=parseInt(req.params.id,10);
  var name=db.getName(id);
  res.json(name);
  
})

//새로운 users 추가
router.put('/:id/:token/:name', function(req, res) {
  //
  const id=parseInt(req.params.id,10), token=req.params.token, name=req.params.name;
  
  db.Add(id, token, name);
  res.send('Welcome '+id +'!!');
});

//기존 user 이름 변경, token 인증 필요
router.patch('/:newname',
  passport.authenticate('bearer', { session: false }),
  function(req, res){
    
    var id = req.user.id, newname=req.params.newname;

    var well = db.Change(id,newname);
    
    if(well)
      res.json('now '+id+' is '+newname);
    else
      res.json('error: no such id');
})

//기존 user 삭제, token 인증 필요
router.delete('/',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {

    const id = req.user.id;
    
    var well = db.Del(id);
    if(well) 
      res.json(id+' is deleted');
    else 
      res.json('error: no such id');
  });

  





module.exports = router;
