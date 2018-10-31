module.exports = function (app) {

var express = require('express');
//var router = express.Router();
var sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
//const mod = require('./models');
const models  = require('../sequelize')

app.post('/user/createuser', (req,res,nex) => {
    console.log(req.body);
    var newUser = models.User.build({
        user_nom: req.body.user_nom,
        user_prenom: req.body.user_prenom,
        user_date_nais: req.body.user_date_nais,
        user_civilite: req.body.user_civilite,
        user_adresse: req.body.user_adresse,
        user_cp: req.body.user_cp,
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        role_id: req.body.role_id,
    });
    newUser.save().then(function (user){
        let payload = {subject: user.dataValues.id}
        let token = jwt.sign(payload, 'secretKey');
        res.status(200).send({token});     
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

};
