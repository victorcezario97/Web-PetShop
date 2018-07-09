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

// MongoClient.connect(url, function(err, db) { //Estabelecendo a conexão no formato W3School
//   if (err) throw err;
//   var dbo = db.db("mydb");  //Acessando o banco previamente criado
  
//   app.post('/insertUser', function (req, res) {
//         delete req.body._id; // for safety reasons (Na real não sei para que serve)
//         console.log(req.body); // Imprime no console os dados recebidos do form
//         dbo.collection('users').insertOne(req.body, function(err, res) { //Insere na coleção users
//             if (err) throw err;                                         //esses dados
//                 console.log("1 document inserted");  //imprime no console que inserção foi executada
//             db.close();         //fecha o banco
//         });
//     // res.send('Data received:\n' + JSON.stringify(req.body));  //usada para debug no browser
//   });

// });

// app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');
// console.log('Node server is running on http://localhost:3000');

//require('make-runnable');

// node -e 'require("./server").init()'

// node server.js init
