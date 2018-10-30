var http = require('http');
var express = require('express');
var cors = require('cors');
//var mongoose = require('mongoose');
//var mysql = require('mysql');

var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var app = express();
var appRoutes = require('./routes/client');

//mongoose.connect('mongodb://localhost/meanDb', {useNewUrlParser: true});



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', appRoutes);
 
/*app.get('/', function(req, res){
    res.send('Hello from server');
})*/
http.createServer(app).listen(port);

console.log('Back is running on port: ',port);