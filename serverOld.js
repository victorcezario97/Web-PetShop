var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb');

var adminRouter = require('./server/Routers/router_admin');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'html')));
app.use('/css', express.static(path.resolve(__dirname, 'css')));
app.use('/script',express.static(path.resolve(__dirname, 'script')));
app.use('/img', express.static(path.resolve(__dirname, 'img')));


    console.log("Entrou");
app.use('/', adminRouter);

//require('make-runnable');

// node -e 'require("./server").init()'

// node server.js init
