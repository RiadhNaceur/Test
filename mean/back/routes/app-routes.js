var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

var User = require('../models/dataSchema');

router.post('/create', (req,res,nex) => {
    var newUser = new User({
        name:req.body.name,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password 
    });
    newUser.save((err,user)=>{
        if (err){
        res.status(500).json({errmsg: err});
        }else{
            let payload = {subject: user._id}
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token});     
        }    

    });
});

router.get('/read', verifyToken, (req,res,next) => {
    User.find({},(err,users)=>{
        if (err)
        res.status(500).json({errmsg: err});
        res.status(200).json({msg: users});
    })
});

router.get('/get/:id', (req,res,nex) => {
    User.findById({_id:req.params.id}, (err,user)=>{
        if (err)
        res.status(500).json({errmsg: err});
        res.status(200).send(user);
    })
});

router.put('/update', (req,res,nex) => {
    User.findById(req.body._id, (err,user)=>{
        if (err)
        res.status(500).json({errmsg: err});
        user.name = req.body.name;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.password = req.body.password;
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


router.post('/login', (req,res,nex) => {
    User.findOne({email:req.body.email},(err,user)=>{
        if (err){
            res.status(500).json({errmsg: err});
        }else{
            if (!user || req.body.password !== user.password){
                res.status(401).send('mot de passe ou email invalid')
            }else{
                let payload = {subject: user._id}
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({token});     
            }
        }
    })
});

function verifyToken(req, res, next){
    if (!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null'){
        return res.status(401).send('Unauthorized request');
    }

  var payload = jwt.verify(token, 'secretKey');
  if (!payload)
  return res.status(401).send('Unauthorized request');
  req.userId = payload.subject;
  next()
    
}
module.exports = router;