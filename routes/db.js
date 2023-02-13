

var express = require('express');

//user 리스트
var users=
[
    {id: 1, token: '1111', name:'jiwon'},
    {id: 2, token: '2222', name:'asdf'},
    {id: 3, token: '3333', name:'qwer'}

];

//token 같은 user 존재하는지 확인
function findByToken (token, cb) {
    process.nextTick(function() {
      for (var i = 0, len = users.length; i < len; i++) {

        var user = users[i];
        if (user.token === token) {
          return cb(null, user);
        }
      }
      return cb(null, null);
    });
  }

//모든 user의 id, name 가진 list 반환
function getAll()
{
    var user_list = [];
    for(var i = 0, len = users.length ;i < len; i++)
    {
        user_list[i] = {id: users[i].id, name: users[i].name};
    }

    return user_list;
}

//특정 id의 name 반환
function getName(id)
{
    for(var i = 0, len = users.length ; i<len ; i++)
    {
        if(id == users[i].id ) return users[i].name;
    }
    return 'no id';
}

//id, token, name의 새로운 user 만들어서 리스트에 추가
function Add(id, token, name)
{
    users[users.length] = {id: id, token: token, name: name};
    
    return;
}

//특정 id의 user 이름 변경
function Change(id,newname)
{
    for(var i=0,len=users.length;i<len;i++)
    {
        if(id==users[i].id)
        {
            users[i].name=newname;
            return true;
        }
    }
    return false;
}

//특정 id의 user 리스트에서 삭제
function Del(id)
{
    for(var i=0,len=users.length;i<len;i++)
    {
        if(id==users[i].id)
        {
            users.splice(i,1);
            return true;
        }
    }
    return false;
}


exports.findByToken=findByToken;
exports.getAll=getAll;
exports.getName=getName;
exports.Add=Add;
exports.Change=Change;
exports.Del=Del;
