module.exports = function (app) {

    var express = require('express');
    var sequelize = require('sequelize');
    const jwt = require('jsonwebtoken');
    const models  = require('../sequelize').Role
    
    app.delete('/role/deleterole/:id', (req,res,nex) => {

        models.destroy({where: {role_id: req.params.id}}).then(function (role){
            res.status(200).json({msg: role});     
        }, function(err){
            res.status(500).json({errmsg: err});
        });
    
    });
    
    app.post('/role/createrole', (req,res,nex) => {
        const actions = req.body.action_list;
        console.log(req.body);
        var newRole = models.build({
            role_nom:req.body.role_nom,
            role_etat:req.body.role_etat
        });
    
        newRole.save().then(function (role){
            role.addActions(actions);
            res.status(200).send({role});     
        }, function(err){
            res.status(500).json({errmsg: err});
        });
    });
    
    };
    