var express = require('express');
var router = express.Router();
var User = require('../models/dataSchema');

router.post('/create', (req,res,nex) => {
    var newUser = new User({
        name:req.body.name,
        lastname:req.body.lastname
    });
    newUser.save((err,user)=>{
        if (err)
        res.status(500).json({errmsg: err});
        res.status(200).json({msg: user});


    });
});

router.get('/read', (req,res,nex) => {
    User.find({},(err,users)=>{
        if (err)
        res.status(500).json({errmsg: err});
        res.status(200).json({msg: users});
    })
});

router.put('/update', (req,res,nex) => {
    User.findById(req.body._id, (err,user)=>{
        if (err)
        res.status(500).json({errmsg: err});
        user.name = req.body.name;
        user.lastname = req.body.lastname;
        user.save((err,user)=>{
            if (err)
            res.status(500).json({errmsg: err});
            res.status(200).json({msg: user}); 
        })
    })
});


router.delete('/delete/:id', (req,res,nex) => {
    User.findOneAndRemove({_id:req.params.id},(err,user)=>{
        if (err)
            res.status(500).json({errmsg: err});
            res.status(200).json({msg: user}); 
    })
});

module.exports = router;