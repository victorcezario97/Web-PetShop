var mongoose = require('mongoose');

var connection = mongoose.createConnection("mongodb://localhost:27017/mydb");

autoIncrement.initialize(connection);


// Product
var productSchema = new mongoose.Schema({
     name : {type: String},
     photo : {type : String, default : ''},
     description: {type: String, default: ''},
     price: {type: String, default: 'R$ 0,00'},
     quantityStock: {type: Number, default: 0},
     quantitySold: {type: Number, default: 0},
     category: {type: String},
     subcategory: {type: String}
});

productSchema.plugin(autoIncrement.plugin, 'admin');

var Product = mongoose.model('product', productSchema);
module.exports = Product;