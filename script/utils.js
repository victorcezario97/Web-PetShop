var db;
const dbName = "DBPetShop";
var typeLogged;
var clientId, clientName, clientUser, clientAddress, clientPhoto, clientPhone, clientEmail, clientPassword;
var adminId, adminName, adminUser, adminPhoto, adminPhone, adminEmail, adminPassword;

// Na linha abaixo, você deve incluir os prefixos do navegador que você vai testar.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// Não use "var indexedDB = ..." se você não está numa function.
// Posteriormente, você pode precisar de referências de algum objeto window.IDB*:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla nunca usou prefixo nesses objetos, então não precisamos window.mozIDB*)

// Popula inicialmente a tabela de clientes
// O registro de cada cliente inclui, pelo menos: nome, id, endereço, foto, telefone, email
const Clientes = [
  {name: "Luiz Inácio", user: "luizinho", address: "Cela 35 da PF de Curitiba", photo: null, phone: "33338888", email: "lulinha@gmail.com", password: "123456"},
  {name: "Bolsomito", user: "mitinho", address: "Rua das mitagens, 13", photo: null, phone: "13131313", email: "mito@gmail.com", password: "123456"}
];

const Admins = [{name: "admin", user: "admin", email: "admin@gmail.com", photo: null, password: "admin"}];

// Abre o banco
function openDB(){
	if ("indexedDB" in window)  // Conecta
		console.log("Conexão estabelecida!");
	else
		window.alert("O browser não tem suporte para esse IndexedDB.");

	//indexedDB.deleteDatabase(dbName);
	//window.alert("deleta");
	var request = indexedDB.open(dbName, 1); // request é um IDBOpenDBRequest
	//window.alert(location.pathname.substring(location.pathname.lastIndexOf("/") + 1));
	// db é uma instância de IDBDatabase
	request.onsuccess = function(event) {  
		db = event.target.result;
		window.alert("Abriu banco");
	};

	request.onerror = function(event){
		window.alert("Erro: " + event.target.errorCode);
	};

	request.onupgradeneeded = function(event) { // Criando ou atualizando banco
		window.alert("onupgradeneeded");
		db = event.target.result;

		// objectStore com as infos do cliente. Id como keyPath pois é único
		let objectStore = db.createObjectStore("clients", {keyPath: "id", autoIncrement: true});
		let objectStoreAdmin = db.createObjectStore("admins", {keyPath: "id", autoIncrement: true});
		let objectStorePets = db.createObjectStore("pets", {keyPath: "id", autoIncrement: true});

		// Clients
		// Cria índices pra buscar por email e id. Unique: true pois é único.
		objectStore.createIndex("email", "email", {unique: true});
		objectStore.createIndex("user", "user", {unique: true});
		objectStore.createIndex("id", "id", {unique: true});
		// Cria índice pra buscar por nome. Unique: false pois não é único.
		objectStore.createIndex("name", "name", {unique: false});
		window.alert("onupgradeneeded");

		//Admin
		objectStoreAdmin.createIndex("email", "email", {unique: true});
		objectStoreAdmin.createIndex("user", "user", {unique: true});
		objectStoreAdmin.createIndex("id", "id", {unique: true});
		// Cria índice pra buscar por nome. Unique: false pois não é único.
		objectStoreAdmin.createIndex("name", "name", {unique: false});

		//Pets
		objectStorePets.createIndex("id", "id", {unique: true});
		objectStorePets.createIndex("client", "client", {unique: false});
		objectStorePets.createIndex("name", "name", {unique: true});
		objectStorePets.createIndex("nameAndClient", ["name", "client"], {unique: false});


		// Criação do objectStore terminada antes de adicionar dado a ele.
		objectStore.transaction.oncomplete = function(event){
	    	var clientesObjectStore = db.transaction("clients", "readwrite").objectStore("clients");
			for(var i in Clientes)
				clientesObjectStore.add(Clientes[i]);

			var adminsObjectStore = db.transaction("admins", "readwrite").objectStore("admins");
			for(var i in Clientes){
				adminsObjectStore.add(Admins[i]);
				window.alert("Cadastra admin");
			}
		};
	};
}

openDB();