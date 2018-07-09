var mongoose = require('mongoose');

// Admin
var adminSchema = new mongoose.Schema({
     id : {type: Number, unique: true},
     name : {type: String},
     email : {type : String, unique: true},
     password : {type : String},
     photo : {type : String, default : ''},
     phone: {type: String, default: ''}
});

var Admin = mongoose.model('admin', adminSchema); //Salvando na coleção admin
module.exports = Admin;