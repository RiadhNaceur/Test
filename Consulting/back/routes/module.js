module.exports = function (app) {

    const models  = require('../sequelize')


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

    app.get('/module/get', (req,res,next) => {

        models.Module.findAll({ include: [{model: models.Action}]}).then(function (modules){
            res.status(200).json({msg: modules});    
        }, function(err){
            res.status(500).json({errmsg: err});
        });
    
    });
    
    }
    