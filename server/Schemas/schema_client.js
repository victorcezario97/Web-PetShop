var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

//var connection = mongoose.createConnection("mongodb://localhost:27017/mydb");

//autoIncrement.initialize(connection);

// Client
var clientSchema = new mongoose.Schema({
     //id : {type: Number, unique: true},
     name : {type: String},
     user : {type: String, unique: true},
     email : {type : String, unique: true},
     password : {type : String},
     photo : {type : String, default : ''},
     phone: {type: String, default: ''},
     address: {type: String, default: ''}
});

//clientSchema.plugin(autoIncrement.plugin, 'client');

var Client = mongoose.model('client', clientSchema);

module.exports = Client;