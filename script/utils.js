var db;
const dbName = "DBPetShop";
var typeLogged;
var clientId, clientName, clientUser, clientAddress, clientPhoto, clientPhone, clientEmail, clientPassword;
var adminId, adminName, adminUser, adminPhoto, adminPhone, adminEmail, adminPassword;
//PARA TESTE
let prod1 = {id: 1, name: "prod1", description: "description bla bla bla", qtd: 12, price: 100, category:"gato", subcategory:"higiene", img: "../img/object.jpg"};
let prod2 = {id: 2, name: "prod2", description: "description bla bla bla", qtd: 24, price: 1000, category:"mais", subcategory:"roedores", img: "../img/object.jpg"};
let prod3 = {id: 3, name: "prod3", description: "description bla bla bla", qtd: 100, price: 157, category:"mais", subcategory:"roedores", img: "../img/brinquedo_cachorro.png"};

	var carrinho = [];
var page = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

// Na linha abaixo, você deve incluir os prefixos do navegador que você vai testar.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// Não use "var indexedDB = ..." se você não está numa function.
// Posteriormente, você pode precisar de referências de algum objeto window.IDB*:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla nunca usou prefixo nesses objetos, então não precisamos window.mozIDB*)

/*
Registros de produtos incluem, pelo menos: nome, id, foto, descrição, preço, quantidade (em estoque), quantidade vendida. 
Produtos podem ser, por exemplo: comida de cachorro/gato, casinhas, osso de brinquedo, coleiras, etc.
*/

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
		console.log("Abriu banco");
		if(page === "details.html")
			startPets();
		else if(page === "edit_pet.html")
			loadPetToUpdate();
		else if(page === "profile.html")
			loadProfile();
		else if(page === "edit_profile.html")
			loadDatas();
	};

	request.onerror = function(event){
		window.alert("Erro: " + event.target.errorCode);
	};

	request.onupgradeneeded = function(event) { // Criando ou atualizando banco
		console.log("onupgradeneeded");
		db = event.target.result;

		// objectStore com as infos do cliente. Id como keyPath pois é único
		let objectStore = db.createObjectStore("clients", {keyPath: "id", autoIncrement: true});
		let objectStoreAdmin = db.createObjectStore("admins", {keyPath: "id", autoIncrement: true});
		let objectStorePets = db.createObjectStore("pets", {keyPath: "id", autoIncrement: true});
		let objectStoreProducts = db.createObjectStore("products", {keyPath: "id", autoIncrement: true});
		let objectStoreServices = db.createObjectStore("services", {keyPath: "id", autoIncrement: true});

		// Clients
		// Cria índices pra buscar por email e id. Unique: true pois é único.
		objectStore.createIndex("email", "email", {unique: true});
		objectStore.createIndex("user", "user", {unique: true});
		objectStore.createIndex("id", "id", {unique: true});
		// Cria índice pra buscar por nome. Unique: false pois não é único.
		objectStore.createIndex("name", "name", {unique: false});
		console.log("onupgradeneeded");

		//Admin
		objectStoreAdmin.createIndex("email", "email", {unique: true});
		objectStoreAdmin.createIndex("user", "user", {unique: true});
		objectStoreAdmin.createIndex("id", "id", {unique: true});
		// Cria índice pra buscar por nome. Unique: false pois não é único.
		objectStoreAdmin.createIndex("name", "name", {unique: false});

		//Pets
		objectStorePets.createIndex("id", "id", {unique: true});
		objectStorePets.createIndex("client", "client", {unique: false});
		objectStorePets.createIndex("name", "name", {unique: false});
		objectStorePets.createIndex("nameAndClient", ["name", "client"], {unique: false});

		// Products
		objectStoreProducts.createIndex("id", "id", {unique: true});
		objectStoreProducts.createIndex("name", "name", {unique: false});
		objectStoreProducts.createIndex("category", "category", {unique: false});

		// Services
		objectStoreServices.createIndex("id", "id", {unique: true});
		objectStoreServices.createIndex("name", "name", {unique: false});
		//objectStoreServices.createIndex("category", "category", {unique: false});


		// Criação do objectStore terminada antes de adicionar dado a ele.
		objectStore.transaction.oncomplete = function(event){
	    	var clientesObjectStore = db.transaction("clients", "readwrite").objectStore("clients");
			for(var i in Clientes)
				clientesObjectStore.add(Clientes[i]);

			var adminsObjectStore = db.transaction("admins", "readwrite").objectStore("admins");
			for(var i in Admins){
				adminsObjectStore.add(Admins[i]);
				console.log("Cadastra admin");
			}
		};
	};
}

// Seta as variáveis
function setVariables(){
	/*
	var typeLogged;
var clientId, clientName, clientUser, clientAddress, clientPhoto, clientPhone, clientEmail, clientPassword;
var adminId, adminName, adminUser, adminPhoto, adminPhone, adminEmail, adminPassword;
var carrinho = [];
*/
	typeLogged = sessionStorage.getItem("typeLogged");
	if(typeLogged === "client"){
		clientId = parseInt(sessionStorage.getItem("clientId"));
		clientName = sessionStorage.getItem("clientName");
		clientUser = sessionStorage.getItem("clientUser");
		clientAddress = sessionStorage.getItem("clientAddress");
		clientPhoto = sessionStorage.getItem("clientPhoto");
		clientPhone = sessionStorage.getItem("clientPhone");
		clientEmail = sessionStorage.getItem("clientEmail");
		clientPassword = sessionStorage.getItem("clientPassword");
		carrinho = JSON.parse(sessionStorage.getItem("carrinho"));
		// Para salvar o carrinho: sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
		if(carrinho == null) carrinho = [];
		// Para salvar o carrinho: localStorage.setItem("carrinho", JSON.stringify(carrinho));
	}
	else if(typeLogged === "admin"){
		adminId = parseInt(sessionStorage.getItem("adminId"));
		adminName = sessionStorage.getItem("adminName");
		adminUser = sessionStorage.getItem("adminUser");
		adminPhoto = sessionStorage.getItem("adminPhoto");
		adminPhone = sessionStorage.getItem("adminPhone");
		adminEmail = sessionStorage.getItem("adminEmail");
		adminPassword = sessionStorage.getItem("adminPassword");
	}
}

setVariables();
openDB();