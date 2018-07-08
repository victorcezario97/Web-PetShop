var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'html')));


MongoClient.connect(url, function(err, db) { //Estabelecendo a conexão no formato W3School
  if (err) throw err;
  var dbo = db.db("mydb");  //Acessando o banco previamente criado
  
  app.post('/insertUser', function (req, res) {
        delete req.body._id; // for safety reasons (Na real não sei para que serve)
        console.log(req.body); // Imprime no console os dados recebidos do form
        dbo.collection('users').insertOne(req.body, function(err, res) { //Insere na coleção users
	    	if (err) throw err;											//esses dados
	    		console.log("1 document inserted");  //imprime no console que inserção foi executada
	    	db.close();			//fecha o banco
	  	});
    // res.send('Data received:\n' + JSON.stringify(req.body));  //usada para debug no browser
  });

});


// A função para ler do banco

// app.get('/view-feedbacks',  function(req, res) {
//     dbConn.then(function(db) {
//         db.collection('users').find({}).toArray().then(function(feedbacks) {
//             res.status(200).json(feedbacks);
//         });
//     });
// });

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');
console.log('Node server is running on http://localhost:3000');