var express = require('express');
var path = require('path')
var app = express();
var port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var connection = mongoose.connect("mongodb://localhost:27017/mydb");

var adminRouter = require('./server/Routers/router_admin'); //Require da funções de admin
var clientRouter = require('./server/Routers/router_client');
var petRouter = require('./server/Routers/router_pet');
var productRouter = require('./server/Routers/router_product');
var serviceRouter = require('./server/Routers/router_service');

app.use(express.static(path.resolve(__dirname, 'html')));
app.use('/css', express.static(path.resolve(__dirname, 'css')));
app.use('/script',express.static(path.resolve(__dirname, 'script')));
app.use('/img', express.static(path.resolve(__dirname, 'img')));



    console.log("Entrou");
app.use('/', adminRouter); //Acessa as funções de admin quando requisitadas
app.use('/', clientRouter);
app.use('/', petRouter);
app.use('/', productRouter);
app.use('/', serviceRouter);

app.listen(port, () => {
    console.log("Server listening on http://localhost:" + port);
});