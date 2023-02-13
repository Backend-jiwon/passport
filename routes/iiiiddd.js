

var express = require('express');

var users=
[
    {id: 1, token: 1111, name:'jiwon'},
    {id: 2, token: 2222, name:'asdf'},
    {id: 3, token: 3333, name:'qwer'}

];

function findByToken(token, cb) {
    process.nextTick(function() {
      for (var i = 0, len = users.length; i < len; i++) {
        
        if (users[i].token === token) {
          return cb(null, users[i]);
        }
      }
      return cb(null, null);
    });
  }

function getAll()
{
    var user_list=[];
    for(var i=0,len=users.length;i<len;i++)
    {
        user_list[i]={id:users[i].id, name: users[i].name};
    }

    return user_list;
}

function getname(num)
{
    for(var i=0,len=users.length;i<len;i++)
    {
        if(num==users[i].id) return users[i].name;
    }
    return 'no id';
}

function add(id, token, name)
{
    users[users.length]={id: id, token: token, name: name};
    //console.log(users[users.leng]);
    
    return;
}

function del(id,token)
{
    /*for(var i=0,len=users.length;i<len;i++)
    {
        if(num==users[i].id)
        {
            if()
            users.splice(i,i);
            return true;
        }
    }*/
    return false;
}


exports.findByToken=findByToken;
exports.getAll=getAll;
exports.getname=getname;
exports.add=add;
exports.del=del;
