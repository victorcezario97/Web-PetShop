// Cadastra um novo cliente
function registerClient(userName, userEmail, userUser, userPassword, userAddress, userPhone){
	// Cadastra
	let objectStoreRegister = db.transaction("clients", "readwrite").objectStore("clients");
	//{id: 2, name: "Bolsomito", user: "mitinho", address: "Rua das mitagens, 13", photo: null, phone: "13131313", email: "mito@gmail.com", password: "123456"}
	var newUser = {name: userName, user: userUser, address: userAddress, photo: null, phone: userPhone, email: userEmail, password: userPassword};

	var request = objectStoreRegister.add(newUser);

	request.onsuccess = function(event){
		window.alert("Usuário de email " + userEmail + " cadastrado com sucesso!");
		$("#name").val("");
		$("#email").val("");
		$("#user").val("");
		$("#password").val("");
		$("#address").val("");
		$("#phone").val("");
	};

	request.onerror = function(event){
		window.alert("Houve um erro durante o cadastro. Por favor, tente novamente mais tarde.");
	};
}

// Verifica se os dados podem ser cadastrados
function validateClient(userName, userEmail, userUser, userPassword, userAddress, userPhone){
	let resultEmail = null, resultUser = null;
	let transaction = db.transaction("clients", "readwrite");

	transaction.onerror = function(event){
		window.alert("Houve um erro durante o cadastro. Por favor, tente novamente mais tarde.");
	};

	let objectStoreValidateEmail = transaction.objectStore("clients");
	let objectStoreValidateUser = transaction.objectStore("clients");

	var indexEmail = objectStoreValidateEmail.index("email").get(userEmail);
  	var indexUser = objectStoreValidateUser.index("user").get(userUser);

  	// Procura por email
  indexEmail.onsuccess = function(event){
    if(indexEmail.result != undefined){   // Se achou o email
    	if(resultUser === null)
    		resultEmail = false;
    	else if(resultUser)
    		window.alert("Email já cadastrado.");
    	else if(resultUser === false)
    		window.alert("Email e usuário já cadastrados.");
    }
    else{   // Se não achou o email
      resultEmail = true;
      if(resultUser === true)
      	registerClient(userName, userEmail, userUser, userPassword, userAddress, userPhone);
      else if(resultUser === false)
      	window.alert("Usuário já cadastrado.");
    }
  };

  // Procura por user
  indexUser.onsuccess = function(event){
    if(indexUser.result != undefined){   // Se achou o user
    	if(resultEmail === null)
    		resultUser = false;
    	else if(resultEmail)
    		window.alert("Usuário já cadastrado.");
    	else if(resultEmail === false)
    		window.alert("Email e usuário já cadastrados.");
    }
    else{   // Se não achou o user
	    resultUser = true;
	    if(resultEmail === true)
	    	registerClient(userName, userEmail, userUser, userPassword, userAddress, userPhone);
	    else if(resultEmail === false)
	    	window.alert("Email já cadastrado.");
    }
  };
}

// Inicia a rotina de cadastro
function cadastrar(){
	let name = $("#name").val();
	let user = $("#user").val();
	let email = $("#email").val();
	let password = $("#password").val();
	let address = $("#address").val();
	let phone = $("#phone").val();

	if(name === "" || email === "" || password === "" || user === ""){
		window.alert("Tenha certeza de que os campos de nome, email, usuário e senha foram preenchidos.");
		return;
	}
	if(address === "")
		address = null;
	if(phone === "")
		phone = null;

	validateClient(name, email, user, password, address, phone);
}