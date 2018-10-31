var http = require('http');
var express = require('express');
var cors = require('cors');
//var mongoose = require('mongoose');
//var mysql = require('mysql');

var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var app = express();


//var models = require('./routes/models');
//mongoose.connect('mongodb://localhost/meanDb', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());
require("./routes")(app);
//app.use('/', appRoutes);
//app.use('/', models);
/*app.get('/', function(req, res){
    res.send('Hello from server');
})*/
http.createServer(app).listen(port);

console.log('Back is running on port: ',port);



//url: https://www.codementor.io/mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz