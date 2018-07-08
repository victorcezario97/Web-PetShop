var http = require('http');
var path = require('path');
var fs = require('fs');
//var req = require('make-runnable');

//these are the only file types we will support for now
extensions = {
    ".html" : "text/html",
    ".css" : "text/css",
    ".js" : "application/javascript",
    ".png" : "image/png",
    ".gif" : "image/gif",
    ".jpg" : "image/jpeg",
    ".jpeg" : "image/jpeg"
};


//helper function handles file verification
function getFile(filePath,res,/*page404,*/mimeType){
    //does the requested file exist?
    fs.exists(filePath,function(exists){
        //if it does...
        if(exists){
            //read the fiule, run the anonymous function
            fs.readFile(filePath,function(err,contents){
                if(!err){
            //console.dir("filePath: " + filePath); DEBUG
                    //if there was no error
                    //send the contents with the default 200/ok header
                    res.writeHead(200,{
                        "Content-type" : mimeType,
                        "Content-Length" : contents.length
                    });
                    res.end(contents);
                } else {
                    console.dir(err);
                };
            });
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        };
    });
};

//a helper function to handle HTTP requests
function requestHandler(req, res) {
    var
    fileName = path.basename(req.url) || 'home.html',
    ext = path.extname(fileName),
     localFolder = __dirname + '/html/';
    // page404 = localFolder + '404.html';
    
    if(ext === '.html' /*&& fileName != 'home.html' */){
        localFolder = __dirname + '/html/'; //TESTANDO SEM O SPA
    }else if(ext === '.js'){
        localFolder = __dirname + '/script/';
    }else if(ext === '.css'){
        localFolder = __dirname + '/css/';
    }else if(ext === '.jpg' || ext === '.png' || ext === '.jpeg')
        localFolder = __dirname + '/img/';

    /* Debug
    console.dir("ext: " + ext);
    console.dir("fileName: " + fileName);
    console.dir("localFolder: " + localFolder);
    */

    //do we support the requested file type?
    if(!extensions[ext]){
        //for now just send a 404 and a short message
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;The requested file type is not supported&lt;/body&gt;&lt;/html&gt;");
    };

    getFile((localFolder + fileName),res, /*page404,*/extensions[ext]);
};

//step 2) create the server
    http.createServer(requestHandler)

 //step 3) listen for an HTTP request on port 3000
    .listen(8080);


    console.log('Node server is running on http://localhost:8080');
//Até as funções utilizadas só manipulavam a requisição de arquivo
/////////////////////////////////////////////////////////////////////////////////////

//module.exports.start = function(){
    console.log("Entrou");


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
            if (err) throw err;                                         //esses dados
                console.log("1 document inserted");  //imprime no console que inserção foi executada
            db.close();         //fecha o banco
        });
    // res.send('Data received:\n' + JSON.stringify(req.body));  //usada para debug no browser
  });

});



//require('make-runnable');

// node -e 'require("./server").init()'

// node server.js init
