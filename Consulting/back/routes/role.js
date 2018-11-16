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
        const actions = req.body.actions;
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
        console.log(req.body)
       models.Role.findById(req.params.id).then(function (role){
                const actions = req.body.actions;
                role.updateAttributes({
                    role_nom: req.body.role_nom,
                    role_etat: req.body.role_etat
                }).then(function (UpdatedRole){
                    if (actions){
                        UpdatedRole.setActions(actions);
                        res.status(200).json({msg: UpdatedRole});
                    }else{
                        res.status(200).json({msg: 'updated'});  
                    }
                },function(err){
                    console.log(err)
                    res.status(500).json({errmsg: err});
                })
            }, function(err){
                console.log(err)
                res.status(400).json({errmsg: err});
            });
        })
    
    app.get('/role/get', (req,res,next) => {

        models.Role.findAll()
            .then(function (roles){
            res.status(200).send(roles);   
        }, function(err){
            res.status(500).json({errmsg: err});
        })
    
    })
    
    app.get('/role/get/:id', (req,res,nex) => {
        var tab = [];
        var tab2 = [];
        models.Role.findById(req.params.id,{ include: [
            {
                
                model: models.Action,
                through: {attributes: []},
                include: [models.Module]
            }]
            }).then(function (role){
               /* tab['role_id'] = role.role_id;
                tab['role_nom'] = role.role_nom;
                tab['role_etat'] = role.role_etat;
                tab['createdAt'] = role.createdAt;
                tab['updatedAt'] = role.updatedAt;*/
                
                role.actions.forEach(function(element) {
                    key = element.module.module_id;
                   
                    tab2[element.module.module_id] = element.module.module_id //.push();
                    
                  });
                  
                  var filtered = tab2.filter(function (el) {
                    return el != null;
                  })

                  console.log(filtered)
                  for (var key in filtered) {
                  console.log("key " + key + " has value " + filtered[key]);
                  }

                  role.dataValues['modules'] = filtered;
                  
                  
            res.status(200).send(role);    
        }, function(err){
            res.status(500).json({errmsg: err});
        })
    })

    }
    