module.exports = function (app) {

    var express = require('express');
    var sequelize = require('sequelize');
    const jwt = require('jsonwebtoken');
    const models  = require('../sequelize')
    
    app.delete('/role/deleterole/:id', (req,res,nex) => {

        models.Role.destroy({where: {role_id: req.params.id}}).then(function (role){
            res.status(200).json({msg: role});     
        }, function(err){
            res.status(500).json({errmsg: err});
        });
    
    })
    
    app.post('/role/createrole', (req,res,nex) => {
        const actions = req.body.action_list;
        console.log(req.body);
        var newRole = models.Role.build({
            role_nom:req.body.role_nom,
            role_etat:req.body.role_etat
        });
    
        newRole.save().then(function (role){
            role.addActions(actions);
            res.status(200).send({role});     
        }, function(err){
            res.status(500).json({errmsg: err});
        });
    })

    app.put('/role/update/:id', (req,res,nex) => {

        models.Role.findById(req.params.id).then(function (role){
                const actions = req.body.action_list;
                role.updateAttributes({
                    role_nom: req.body.role_nom,
                    role_etat: req.body.role_etat
                }).then(function (UpdatedRole){
                    UpdatedRole.setActions(actions);
                    res.status(200).json({msg: UpdatedRole});
                },function(err){
                    res.status(500).json({errmsg: err});
                })
            }, function(err){
                res.status(400).json({errmsg: err});
            });
        })
    
    app.get('/role/get', (req,res,next) => {

        models.Role.findAll({
            attributes: ['role_id','role_nom', 'createdAt','role_etat']
        })
            .then(function (roles){
            res.status(200).send(roles);   
        }, function(err){
            res.status(500).json({errmsg: err});
        })
    
    })
    
    app.get('/role/get/:id', (req,res,nex) => {
        models.Role.findById(req.params.id,{ include: [
            {
                model: models.Action,
                through: {attributes: []},
                include: [models.Module]
            }]
            }).then(function (role){
            res.status(200).send(role);    
        }, function(err){
            res.status(500).json({errmsg: err});
        })
    })

    }
    