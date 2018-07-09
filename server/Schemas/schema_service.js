var mongoose = require('mongoose');

// Service
var serviceSchema = new mongoose.Schema({
     id : {type: Number, unique: true},
     name : {type: String},
     photo : {type : String, default : ''},
     description: {type: String, default: ''},
     price: {type: String, default: 'R$ 0,00'},
});

var Service = mongoose.model('service', serviceSchema);
module.exports = Service;