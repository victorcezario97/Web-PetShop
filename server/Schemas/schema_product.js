var mongoose = require('mongoose');

// Product
var productSchema = new mongoose.Schema({
     id : {type: Number, unique: true},
     name : {type: String},
     photo : {type : String, default : ''},
     description: {type: String, default: ''},
     price: {type: String, default: 'R$ 0,00'},
     quantityStock: {type: Number, default: 0},
     quantitySold: {type: Number, default: 0},
     category: {type: String},
     subcategory: {type: String}
});

var Product = mongoose.model('product', productSchema);
module.exports = Product;