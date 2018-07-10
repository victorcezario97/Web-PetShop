var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

// Popula

var newAdmin = JSON.stringify({name: "admin", user: "admin", photo: null, phone: "123456", email: "admin@gmail.com", password: "admin"});
var newUser = JSON.stringify({name: "wallace", user: "wallace", photo: null, phone: "123456", email: "wallace@gmail.com", password: "wallace"});

let xhttpr = new XMLHttpRequest();
xhttpr.open("POST", urlMongo + "admin/register", true);
xhttpr.setRequestHeader("Content-Type", "application/json");

xhttpr.onreadystatechange = function(){
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
        console.log("Cadastrou");
    }
    else
        console.log("Houve um erro durante o cadastro. Por favor, tente novamente mais tarde.");
};
xhttpr.send(newAdmin);

let xhttpr1 = new XMLHttpRequest();
xhttpr1.open("POST", urlMongo + "client/register", true);
xhttpr1.setRequestHeader("Content-Type", "application/json");

xhttpr1.onreadystatechange = function(){
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
        console.log("Cadastrou");
    }
    else
        console.log("Nao cadastrou");
};
xhttpr1.send(newUser);
