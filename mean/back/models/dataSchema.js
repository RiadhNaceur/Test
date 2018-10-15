var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    name: {type: String},
    lastname: {type: String},
});

module.exports = mongoose.model('user', userSchema);
