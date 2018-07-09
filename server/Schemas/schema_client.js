var mongoose = require('mongoose');

// Client
var clientSchema = new mongoose.Schema({
     id : {type: Number, unique: true},
     name : {type: String},
     email : {type : String, unique: true},
     password : {type : String},
     photo : {type : String, default : ''},
     phone: {type: String, default: ''},
     address: {type: String, default: ''}
});

var Client = mongoose.model('client', clientSchema);
module.exports = Client;