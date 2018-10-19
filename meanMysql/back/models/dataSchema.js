var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    name: {type: String},
    lastname: {type: String},
    email: {type: String},
    password: {type: String},
});

module.exports = mongoose.model('user', userSchema);
