var mongoose = require('mongoose');

var connection = mongoose.createConnection("mongodb://localhost:27017/mydb");

autoIncrement.initialize(connection);

// Service
var serviceSchema = new mongoose.Schema({
     name : {type: String},
     photo : {type : String, default : ''},
     description: {type: String, default: ''},
     price: {type: String, default: 'R$ 0,00'},
});

serviceSchema.plugin(autoIncrement.plugin, 'admin');

var Service = mongoose.model('service', serviceSchema);
module.exports = Service;