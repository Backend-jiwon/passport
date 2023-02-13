

var express = require('express');

var users=
[
    {id: 1, token: '1111', name:'jiwon'},
    {id: 2, token: '2222', name:'asdf'},
    {id: 3, token: '3333', name:'qwer'}

];

function findByToken (token, cb) {
    process.nextTick(function() {
      for (var i = 0, len = users.length; i < len; i++) {

        var user=users[i];
        if (user.token == token) {
          return cb(null, user);
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
    
    return;
}

function change(id,newname)
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

function del(id)
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
exports.getname=getname;
exports.add=add;
exports.change=change;
exports.del=del;
