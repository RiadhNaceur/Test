module.exports = function (app) {

    const models  = require('../sequelize')
    app.delete('/action/deleteaction/:id', (req,res,nex) => {
        models.Action.destroy({where: {action_id: req.params.id}}).then(function (ac){
            res.status(200).json({msg: ac});     
        }, function(err){
            res.status(500).json({errmsg: err});
        })

    })

    app.post('/action/createaction', (req,res,nex) => {
        console.log(req.body);
        var newAction = models.Action.build({
            action_nom:req.body.action_nom,
            action_fonction:req.body.action_fonction,
            action_etat:req.body.action_etat
        })
        newAction.save().then(function (action){
            action.setModule(req.body.module_id).then(function (act){
                res.status(200).send({action}); 
            },function(err){
                res.status(500).json({errmsg: err});
            })
               
        }, function(err){
            res.status(500).json({errmsg: err});
        })
    
    })

    app.get('/action/get', (req,res,next) => {

        models.Action.findAll( {include: [models.Module]}).then(function (actions){
            res.status(200).send(actions);    
        }, function(err){
            res.status(500).json({errmsg: err});
        });
    
    });
    
    app.get('/action/get/:id', (req,res,nex) => {
        models.Action.findById(req.params.id,{ include: [models.Module]
            }).then(function (action){
            res.status(200).send(action);    
        }, function(err){
            res.status(500).json({errmsg: err});
        })
    })
    
    }