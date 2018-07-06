//step 1) require the modules we need
var
http = require('http'),
path = require('path'),
fs = require('fs'),

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
                    //for our own troubleshooting
                    console.dir(err);
                };
            });
        } else {/*
            //if the requested file was not found
            //serve-up our custom 404 page
            fs.readFile(page404,function(err,contents){
                //if there was no error
                if(!err){
                    //send the contents with a 404/not found header 
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(contents);
                } else {
                    //for our own troubleshooting
                    console.dir(err);
                };
            });     */
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
    
    if(ext === '.html' && fileName != 'home.html'){
        localFolder = __dirname + '/html/single/';
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

    //call our helper function
    //pass in the path to the file we want,
    //the response object, and the 404 page path
    //in case the requestd file is not found
    getFile((localFolder + fileName),res, /*page404,*/extensions[ext]);
};


//step 2) create the server
http.createServer(requestHandler)

//step 3) listen for an HTTP request on port 3000
.listen(8080);

console.log('Node server is running on http://localhost:8080');


var request = require('request');

var url = 'http://127.0.0.1:5984/';
var db = 'mydatabase/';
var id = 'document_id';

/*
// Create a database/collection inside CouchDB
request.put(url + db, function(err, resp, body) {
  /*
  // Add a document with an ID
  request.put({
    url: url + db + id,
    body: {message:'New Shiny Document', user: 'stefan'},
    json: true,
  }, function(err, resp, body) {
    // Read the document
    request(url + db + id, function(err, res, body) {
      console.log(body.user + ' : ' + body.message);
    });
  });
  
});
*/
/*
const NodeCouchDb = require('node-couchdb');
 
// node-couchdb instance with default options
const couch = new NodeCouchDb();
 
// node-couchdb instance with Memcached
const MemcacheNode = require('node-couchdb-plugin-memcached');
const couchWithMemcache = new NodeCouchDb({
    cache: new MemcacheNode
});
 
// node-couchdb instance talking to external service
const couchExternal = new NodeCouchDb({
    host: 'couchdb.external.service',
    protocol: 'https',
    port: 5984
});

var dbName = "test";
couch.createDatabase(dbName).then(() => {}, err => {
    // request error occured
});
*/

var nano = require('nano')('http://localhost:5984');
//module.exports = nano(process.env.COUCHDB_URL || url);

nano.db.create('test2', function(err) {  
  if (err) {
    console.error(err);
  }
});
