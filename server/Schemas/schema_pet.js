var mongoose = require('mongoose');

var connection = mongoose.createConnection("mongodb://localhost:27017/mydb");

autoIncrement.initialize(connection);


// Pet
var petSchema = new mongoose.Schema({
     name : {type: String},
     photo : {type : String, default : ''},
     raca: {type: String, default: ''},
     age: {type: Number},
     idClient : {type: Number}
});

petSchema.plugin(autoIncrement.plugin, 'admin');

var Pet = mongoose.model('pet', petSchema);
module.exports = Pet;