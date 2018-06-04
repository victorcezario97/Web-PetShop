function test(userEmail){
	let objectStore = db.transaction("clients").objectStore("clients");
	var indexEmail = objectStore.index("email").get(userEmail);
	indexEmail.onsuccess = function(event){
	    if(indexEmail.result != undefined){   // Se achou o email
	      window.alert("Realmente cadastrou");
	    }
	    else{   // Se não achou o email
	      window.alert("Não cadastrou não!");
	    }
	};
}

function registerClient(userName, userEmail, userPassword, userAddress, userPhone){
	let transaction = db.transaction("clients", "readwrite");

	transaction.oncomplete = function(event){
		window.alert("Usuário de email " + userEmail + " cadastrado com sucesso!");
		// apaga os inputs
	};

	transaction.onerror = function(event){
		window.alert("Houve um erro durante o cadastro!");
	};

	// Cadastra
	let objectStore = transaction.objectStore("clients");
	window.alert("objectstore");
	//{id: 2, name: "Bolsomito", user: "mitinho", address: "Rua das mitagens, 13", photo: null, phone: "13131313", email: "mito@gmail.com", password: "123456"}
	var newUser = {name: userName, user: userName, address: userAddress, photo: null, phone: userPhone, email: userEmail, password: userPassword};
	window.alert("newuser");
	var requestX = objectStore.add(newUser);
	requestX.onsuccess = function(event){
		window.alert("Cadastrou " + event.target.result + newUser.email + "\nSenha: " + newUser.password);
		$("#name").val("");
		$("#email").val("");
		$("#password").val("");
		$("#address").val("");
		$("#phone").val("");
		test(userEmail);

	};
	requestX.onerror = function(event){
		window.alert("Errou");
	};
	window.alert("passou do request");
}

function cadastrar(){
	let name = $("#name").val();
	let email = $("#email").val();
	let password = $("#password").val();
	let address = $("#address").val();
	let phone = $("#phone").val();

	if(name === "" || email === "" || password === ""){
		window.alert("Tenha certeza de que os campos de nome, email e senha foram preenchidos.");
		return;
	}
	if(address === "")
		address = null;
	if(phone === "")
		phone = null;

	registerClient(name, email, password, address, phone);
}