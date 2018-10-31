
module.exports = function (app) {

    var express = require('express');
//var router = express.Router();
var sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
//const mod = require('./models');
const models  = require('../sequelize')


app.get('/xD', (req,res,next) => {

    models.User.findAll().then(function (users){
        res.status(200).json({msg: users});    
    }, function(err){
        res.status(500).json({errmsg: err});
    });

});

};
/*
app.get('/read', (req,res,next) => {

    mod.User.findAll().then(function (users){
        res.status(200).json({msg: users});    
    }, function(err){
        res.status(500).json({errmsg: err});
    });

});

app.get('/get/:id', (req,res,nex) => {
    User.findById(req.params.id).then(function (user){
        res.status(200).send(user);    
    }, function(err){
        res.status(500).json({errmsg: err});
    });
});

app.put('/update', (req,res,nex) => {
        User.findById(req.body.id).then(function (user){
            console.log('userrrrr'+user);
            user.updateAttributes({
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password
            }).then(function (Updateduser){
                res.status(200).json({msg: Updateduser});
            },function(err){
                res.status(500).json({errmsg: err});
            })
        }, function(err){
            res.status(500).json({errmsg: err});
        });
    })
app.delete('/delete/:id', (req,res,nex) => {

    User.destroy({where: {id: req.params.id}}).then(function (user){
        res.status(200).json({msg: user});     
    }, function(err){
        res.status(500).json({errmsg: err});
    });

});


app.post('/login', (req,res,nex) => {

    User.findOne({where: {email:req.body.email}}).then(function (user){
        if (!user || req.body.password !== user.password){
            res.status(401).send('mot de passe ou email invalid')
        }else{
            let payload = {subject: user.id}
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token});     
        }  
    }, function(err){
        res.status(500).json({errmsg: err});
    });
});

function verifyToken(req, res, next){
    if (!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }
    var token = req.headers.authorization.split(' ')[1];
    if (!token){
        return res.status(401).send('Unauthorized request');
    }

    try{
  var payload = jwt.verify(token, 'secretKey');
    }catch(err){
        return res.status(401).send('Unauthorized request');
    }
  req.userId = payload.subject;
  next()
    
}*/


//module.exports = router;