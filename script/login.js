var db;
const dbName = "DBPetShop";
var id, name, user, address, photo, phone, email, password;

// Na linha abaixo, você deve incluir os prefixos do navegador que você vai testar.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// Não use "var indexedDB = ..." se você não está numa function.
// Posteriormente, você pode precisar de referências de algum objeto window.IDB*:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla nunca usou prefixo nesses objetos, então não precisamos window.mozIDB*)

// O registro de cada cliente inclui, pelo menos: nome, id, endereço, foto, telefone, email
const Clientes = [
  {id: 1, name: "Luiz Inácio", user: "luizinho", address: "Cela 35 da PF de Curitiba", photo: null, phone: "33338888", email: "lulinha@gmail.com", password: "123456"},
  {id: 2, name: "Bolsomito", user: "mitinho", address: "Rua das mitagens, 13", photo: null, phone: "13131313", email: "mito@gmail.com", password: "123456"}
];

/*
  // Trata erros de todos os requests
db.onerror = function(event){ 
  alert("Database error: " + event.target.errorCode);
};
*/

//window.addEventListener("load", function(event) {
function openDB(){
  if ("indexedDB" in window)  // Conecta
    console.log("Conexão estabelecida!");
  else
    window.alert("O browser não tem suporte para esse IndexedDB.");

  var request = indexedDB.open(dbName, 1); // request é um IDBOpenDBRequest

  // db é uma instância de IDBDatabase
  request.onsuccess = function(event) {  
    db = event.target.result;
    window.alert("Abriu banco");
  };

  request.onerror = function(event){
    window.alert("Erro: " + event.target.errorCode);
  };

  //window.alert("Até onerror");

  request.onupgradeneeded = function(event) { // Criando ou atualizando banco
    db = event.target.result;

    // objectStore com as infos do cliente. Id como keyPath pois é único
    let objectStore = db.createObjectStore("clients", {keyPath: "id", autoIncrement: true});

    // Cria índices pra buscar por email e id. Unique: true pois é único.
    objectStore.createIndex("email", "email", {unique: true});
    objectStore.createIndex("user", "user", {unique: true});
    objectStore.createIndex("id", "id", {unique: true});

    // Cria índice pra buscar por nome. Unique: false pois não é único.
    objectStore.createIndex("name", "name", {unique: false});

    // Criação do objectStore terminada antes de adicionar dado a ele.
    objectStore.transaction.oncomplete = function(event){
      var clientesObjectStore = db.transaction("clients", "readwrite").objectStore("clients");
      for(var i in Clientes){
        clientesObjectStore.add(Clientes[i]);
      }
    };
  };
}

// Valida o login
function validateLogin(result){
  if(result !== null){
    // Seta as variáveis do cliente
    id = result.id;
    name = result.name;
    user = result.user;
    address = result.address;
    photo = result.photo;
    phone = result.phone;
    email = result.email;
    password = result.password;
    // Abre home
    window.alert("Bem-vindo, " + name);
    window.location.href = "home.html";
  }
  else  // Se não
    alert("Email/usuário e/ou senha inválidos.");
}

// Chama validateLogin com result = dados do cliente, se email e senha corretos; result = null, caso contrário.
function getClient(userInput, passwordInput){
  let result = null, resultEmail = true, resultUser = true;
  
  let objectStore = db.transaction(["clients"]).objectStore("clients");
  let objectStore2 = db.transaction(["clients"]).objectStore("clients");
  
  // Procura por email
  var indexEmail = objectStore.index("email").get(userInput);
  var indexUser = objectStore2.index("user").get(userInput);

  indexEmail.onsuccess = function(event){
    if(indexEmail.result != undefined){   // Se achou o email
      if(indexEmail.result.password === passwordInput){ // Se a senha bate
        result = event.target.result;
        validateLogin(result);
        //return;
      }
      else{   // Se a senha não bate
        if(resultUser === false){
          validateLogin(result);
          //return;
        }
        else{
          resultEmail = false;
        }
      }
    }
    else{   // Se não achou o email
      if(resultUser === false){
        validateLogin(result);
        //return;
      }
      else{
        resultEmail = false;
      }
    }
  };

  // Procura por user
  indexUser.onsuccess = function(event){
    if(indexUser.result != undefined){   // Se o user existe
      if(indexUser.result.password === passwordInput){  // Se a senha bate
        result = event.target.result;
        validateLogin(result);
        //return;
      }
      else{ // Se a senha não bate
        if(resultEmail === false){
          validateLogin(result);
          //return;
        }
        else{
          resultUser = false;
        }
      }
    }
    else{   // Se o user não existe
      if(resultEmail === false){
        validateLogin(result);
        //return;
      }
      else{
        resultUser = false;
      }
    }
  }; 
}

function onclickLogin(){
  let userInput = $("#login").val();
  let passwordInput = $("#password").val();
  
  // Se faltou inserir algum campo
  if(userInput === "" || passwordInput === ""){
    alert("Por favor, preencha os campos de email/usuário e senha");
    return;
  }

  // Procura registro com os dados inseridos
  getClient(userInput, passwordInput); 
}

openDB();