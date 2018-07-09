var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

//var connection = mongoose.createConnection("mongodb://localhost:27017/mydb");

//autoIncrement.initialize(connection);

// Admin
var adminSchema = new mongoose.Schema({
     //id : {type: Number, unique: true},
     username : {type: String},
     name : {type: String},
     email : {type : String, unique: true},
     password : {type : String},
     photo : {type : String, default : ''},
     phone: {type: String, default: ''}
});

//adminSchema.plugin(autoIncrement.plugin, 'admin');

var Admin = mongoose.model('admin', adminSchema); //Salvando na coleção admin

module.exports = Admin;
