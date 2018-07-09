var mongoose = require('mongoose');

// Pet
var petSchema = new mongoose.Schema({
     id : {type: Number, unique: true},
     name : {type: String},
     photo : {type : String, default : ''},
     raca: {type: String, default: ''},
     age: {type: Number},
     idClient : {type: Number}
});

var Pet = mongoose.model('pet', petSchema);
module.exports = Pet;