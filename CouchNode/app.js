const express = require('express');
const bodyPaser = require('body-parser');
const path = require('path');
const NodeCouchDb = require('node-couchdb');
var http = require('http');
var url = require('url');
var fs = require('fs');


const couch = new NodeCouchDb({
	auth: {
		user:'admin',
		password: '123456'
	}
});


const dbName = 'customers';
const viewUrl = '_design/all_customers/_view/all'

couch.listDatabases().then(function(dbs){
	console.log(dbs);
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended: false}));

app.get('/', function(req, res){
	// res.render('index');
	couch.get(dbName, viewUrl).then(
		function(data, headers, status){
			console.log(data.data.rows);
			res.send('teste', {
				customers:data.data.rows
			});
		}, 
		function(err){
			res.send(err);
		});
});


app.post('/customer/add', function(req, res){
	const name = req.body.name;
	const email = req.body.email;
	const age = req.body.age;

	console.log("Chamou função post");
	console.log("Name: " + name);
	couch.uniqid().then(function(ids){
		const id = ids[0];

		couch.insert(dbName, {
			_id: id,
			name: name,
			age: age,
			email: email,
		}).then(
			function(data, headers, status){
				res.redirect('/');
			},
			function(err){
				res.send(err);
			});
	});
});


app.post('/customer/delete/:id', function(req, res){
	const id = req.params.id;
	const rev = req.body.rev;

	couch.del(dbName, id, rev).then(
		function(data, headers, status){
			res.redirect('/');
		},
		function(err){
			res.send(err);
		});
});

app.listen(3000, function(){
	console.log('Server on http://localhost:3000');
});


// http.createServer(function (req, res) {
//   var q = url.parse(req.url, true);
//   var filename = "." + q.pathname;
//   fs.readFile(filename, function(err, data) {
//     if (err) {
//       res.writeHead(404, {'Content-Type': 'text/html'});
//       return res.end("404 Not Found");
//     } 
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
//   });
// }).listen(3000, function(){
// 	console.log("Server on http://localhost:3000");
// });

