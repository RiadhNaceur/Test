module.exports = function (app) {
    const util = require('util');

var express = require('express');
//var router = express.Router();
var sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
//const mod = require('./models');
const models  = require('../sequelize')
const roles = {1: 'ADMIN',6: 'USER'}
app.post('/user/createuser', (req,res,nex) => {
    var body = req.body
    console.log(body);
    var newUser = models.User.build({
        user_nom: body.fullname,
        user_prenom: body.fullname,
        /*user_date_nais: body.user_date_nais,
        user_civilite: body.user_civilite,
        user_adresse: body.user_adresse,
        user_cp: body.user_cp,*/
        user_email: body.email,
        user_password: body.password,
        role_id: body.roles,
    });
    newUser.save().then(function (user){
        let payload = {subject: user.dataValues.id}
        let token = jwt.sign(payload, 'secretKey');
        res.status(200).send({user});     
    }, function(err){
        res.status(500).json({errmsg: err});
    });

});

app.get('/user/get', (req,res,next) => {

    models.User.findAll().then(function (users){
        res.status(200).json({msg: users});    
    }, function(err){
        res.status(500).json({errmsg: err});
    });

});

app.get('/user/get/:id', verifyToken, (req,res,nex) => {
    models.User.findById(req.params.id).then(function (user){
        res.status(200).send(user);    
    }, function(err){
        res.status(500).json({errmsg: err});
    });
});

app.put('/user/update/:id', (req,res,nex) => {

    models.User.findById(req.params.id).then(function (user){
            console.log('userrrrr'+user);
            user.updateAttributes({
                user_nom: req.body.user_nom,
                user_prenom: req.body.user_prenom,
                user_date_nais: req.body.user_date_nais,
                user_civilite: req.body.user_civilite,
                user_adresse: req.body.user_adresse,
                user_cp: req.body.user_cp,
                user_email: req.body.user_email,
                user_password: req.body.user_password,
                role_id: req.body.role_id
            }).then(function (Updateduser){
                res.status(200).json({msg: Updateduser});
            },function(err){
                res.status(500).json({errmsg: err});
            })
        }, function(err){
            res.status(400).json({errmsg: err});
        });
    })
    
app.delete('/user/delete/:id', (req,res,nex) => {

    models.User.destroy({where: {user_id: req.params.id}}).then(function (user){
        res.status(200).json({msg: user});     
    }, function(err){
        res.status(500).json({errmsg: err});
    });

});

app.post('/login', (req,res,nex) => {
  //  console.log(req.body)
//var body = JSON.parse(JSON.stringify(req.body))
  models.User.findOne({where: {user_email:req.body.email}}).then(function (user){
        if (!user || req.body.password !== user.user_password){
            res.status(401).send('mot de passe ou email invalid')
        }else{
            let payload = {subject: user.user_id}
            let accToken = jwt.sign(payload, 'secretKey');
            let refToken = jwt.sign(payload, 'secretKeyY');
            res.status(200).send([{'accessToken': accToken, 'refreshToken':refToken,"roles":[roles[user.role_id]],user}]);     
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
    
}

}
