module.exports = function (app) {

    const models  = require('../sequelize')

    app.delete('/module/delete/:id', (req,res,nex) => {

        models.Module.destroy({where: {module_id: req.params.id}}).then(function (module){
            res.status(200).json({msg: module});     
        }, function(err){
            res.status(500).json({errmsg: err});
        });
    
    })
    app.post('/module/createmodule', (req,res,nex) => {
        console.log(req.body);
        var newModule = models.Module.build({
            module_nom:req.body.module_nom,
            module_etat:req.body.module_etat
        })
        newModule.save().then(function (mod){
            res.status(200).send({mod});     
        }, function(err){
            res.status(500).json({errmsg: err});
        })
    
    })
    app.put('/module/update/:id', (req,res,nex) => {

        models.Module.findById(req.params.id).then(function (module){
            module.updateAttributes({
                module_nom: req.body.module_nom,
                module_etat: req.body.module_etat
                }).then(function (UpdatedModule){
                    //UpdatedRole.setActions(actions);
                    res.status(200).json({msg: UpdatedModule});
                },function(err){
                    res.status(500).json({errmsg: err});
                })
            }, function(err){
                res.status(400).json({errmsg: err});
            });
        })
    app.get('/module/get', (req,res,next) => {

        models.Module.findAll( {include: [models.Action]}).then(function (modules){
            res.status(200).json({msg: modules});    
        }, function(err){
            res.status(500).json({errmsg: err});
        });
    
    });
    
    app.get('/module/get/:id', (req,res,nex) => {
        models.Module.findById(req.params.id,{ include: [models.Action]
            }).then(function (module){
            res.status(200).send(module);    
        }, function(err){
            res.status(500).json({errmsg: err});
        })
    })
    
    }
    