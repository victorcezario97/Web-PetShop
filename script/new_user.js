var page, registerType, userPhoto = null;

function registerAdmin(userName, userEmail, userUser, userPassword, userPhone){
	// Cadastra
	let objectStoreRegister = db.transaction("admins", "readwrite").objectStore("admins");
	//{id: 2, name: "Bolsomito", user: "mitinho", address: "Rua das mitagens, 13", photo: null, phone: "13131313", email: "mito@gmail.com", password: "123456"}
	var newUser = {name: userName, user: userUser, photo: null, phone: userPhone, email: userEmail, password: userPassword};

	var request = objectStoreRegister.add(newUser);

	request.onsuccess = function(event){
		window.alert("Administrador de email " + userEmail + " cadastrado com sucesso!");

		$("#name").val("");
		$("#email").val("");
		$("#user").val("");
		$("#password").val("");
		$("#phone").val("");
		$("#img").attr('src', '../img/perfil.jpg');
		userPhoto = null;
	};

	request.onerror = function(event){
		window.alert("Houve um erro durante o cadastro. Por favor, tente novamente mais tarde.");
	};
}

// Cadastra um novo cliente
function registerClient(userName, userEmail, userUser, userPassword, userAddress, userPhone){
	// Cadastra
	let objectStoreRegister = db.transaction("clients", "readwrite").objectStore("clients");
	//{id: 2, name: "Bolsomito", user: "mitinho", address: "Rua das mitagens, 13", photo: null, phone: "13131313", email: "mito@gmail.com", password: "123456"}
	var newUser = {name: userName, user: userUser, address: userAddress, photo: userPhoto, phone: userPhone, email: userEmail, password: userPassword};

	var request = objectStoreRegister.add(newUser);

	request.onsuccess = function(event){
		window.alert("Cliente de email " + userEmail + " cadastrado com sucesso!");

		// Se estamos na página new_user
		if(page === "new_user.html"){
			$("#name").val("");
			$("#email").val("");
			$("#user").val("");
			$("#password").val("");
			$("#address").val("");
			$("#phone").val("");
			$("#img").attr('src', '../img/perfil.jpg');
			userPhoto = null;
		}
		else if(page === "registrar.html"){
			clientId = request.result.id;
		    clientName = request.result.name;
		    clientUser = request.result.user;
		    clientAddress = request.result.address;
		    clientPhoto = request.result.photo;
		    clientPhone = request.result.phone;
		    clientEmail = request.result.email;
		    clientPassword = request.result.password;
		    // Abre home
		    window.location.href = "home.html";
		}
	};

	request.onerror = function(event){
		window.alert("Houve um erro durante o cadastro. Por favor, tente novamente mais tarde.");
	};
}

// Verifica se os dados podem ser cadastrados
function validateUser(userName, userEmail, userUser, userPassword, userAddress, userPhone){
	let resultEmailClient = null, resultUserClient = null, resultEmailAdmin = null, resultUserAdmin = null;

	let transactionClientEmail = db.transaction("clients", "readwrite");
	let transactionClientUser = db.transaction("clients", "readwrite");
	let transactionAdminEmail = db.transaction("admins", "readwrite");
	let transactionAdminUser = db.transaction("admins", "readwrite");

	if(page === "new_admin.html")
		registerType = "admin";
	else
		registerType = "client";

	let objectStoreValidateEmailClient = transactionClientEmail.objectStore("clients");
	let objectStoreValidateUserClient = transactionClientUser.objectStore("clients");
	let objectStoreValidateEmailAdmin = transactionAdminEmail.objectStore("admins");
	let objectStoreValidateUserAdmin = transactionAdminUser.objectStore("admins");

	var indexEmail = objectStoreValidateEmailClient.index("email").get(userEmail);
  	var indexUser = objectStoreValidateUserClient.index("user").get(userUser);
  	var indexEmailAdmin = objectStoreValidateEmailAdmin.index("email").get(userEmail);
  	var indexUserAdmin = objectStoreValidateUserAdmin.index("user").get(userUser);

  // Procura por email de client
  indexEmail.onsuccess = function(event){
    if(indexEmail.result != undefined){   // Se achou o email
    	window.alert("achou email client");
    	if(resultUserClient === null || resultEmailAdmin === null || resultUserAdmin === null)	// Se ainda falta alguém
    		resultEmailClient = false;
    	else if(resultUserClient === true && resultEmailAdmin != null && resultUserAdmin === true)	// Se já tem só o email
    		window.alert("Email já cadastrado.");
    	else if((resultUserClient === false || resultUserAdmin === false) && resultEmailAdmin != null) // Se já tem e-mail e usuário
    		window.alert("Email e usuário já cadastrados.");
    }
    else{   // Se não achou o email
    	window.alert("não achou email client");
      resultEmailClient = true;
      if(resultUserClient === true && resultEmailAdmin === true && resultUserAdmin === true){	// Se todos livres
      	if(registerType === "client")
      		registerClient(userName, userEmail, userUser, userPassword, userAddress, userPhone);
      	else
      		registerAdmin(userName, userEmail, userUser, userPassword, userPhone);
      }
      else if((resultUserClient === false || resultUserAdmin === false) && resultEmailAdmin === true)	// Se só o usuário já tem
      	window.alert("Usuário já cadastrado.");
    }
  };

  // Procura por user de client
  indexUser.onsuccess = function(event){
    if(indexUser.result != undefined){   // Se achou o user
    	window.alert("achou user client");
    	if(resultEmailClient === null || resultEmailAdmin === null || resultUserAdmin === null)	// Se ainda falta alguém
    		resultUserClient = false;
    	else if(resultEmailClient === true && resultEmailAdmin === true && resultUserAdmin != null)	// Se já tem só o usuário 
    		window.alert("Usuário já cadastrado.");
    	else if((resultEmailClient === false || resultEmailAdmin === false) && resultUserAdmin != null)	// Se já tem email e usuário
    		window.alert("Email e usuário já cadastrados.");
    }
    else{   // Se não achou o user
    	window.alert(" não achou user client");
	    resultUserClient = true;
	    if(resultEmailClient === true && resultEmailAdmin === true && resultUserAdmin === true){	// Se todos livres
	      	if(registerType === "client")
	      		registerClient(userName, userEmail, userUser, userPassword, userAddress, userPhone);
	      	else
	      		registerAdmin(userName, userEmail, userUser, userPassword, userPhone);
	    }
	    else if((resultEmailClient === false || resultEmailAdmin === false) && resultUserAdmin === true)	// Se só o email já tem
	    	window.alert("Email já cadastrado.");
    }
  };

  // Procura por email de admin
  indexEmailAdmin.onsuccess = function(event){
    if(indexEmailAdmin.result != undefined){   // Se achou o email
    	window.alert("achou email admin");
    	if(resultUserAdmin === null || resultEmailClient === null || resultUserClient === null)	// Se ainda falta alguém
    		resultEmailAdmin = false;
    	else if(resultUserClient === true && resultEmailClient != null && resultUserAdmin === true) // Só email já tem
    		window.alert("Email já cadastrado.");
    	else if((resultUserClient === false || resultUserAdmin === false) && resultEmailClient != null)	// Se já tem email e usuário
    		window.alert("Email e usuário já cadastrados.");
    }
    else{   // Se não achou o email
      resultEmailAdmin = true;
      window.alert("Não achou email admin");
      if(resultUserClient === true && resultEmailClient === true && resultUserAdmin === true){	// Se todos livres
      	if(registerType === "client")
      		registerClient(userName, userEmail, userUser, userPassword, userAddress, userPhone);
      	else
      		registerAdmin(userName, userEmail, userUser, userPassword, userPhone);
      }
      else if((resultUserClient === false || resultUserAdmin === false) && resultEmailClient === true)	// Se só o usuário já tem
      	window.alert("Usuário já cadastrado.");
    }
  };

  // Procura por user de admin
  indexUserAdmin.onsuccess = function(event){
    if(indexUserAdmin.result != undefined){   // Se achou o user
    	window.alert("achou user admin");
    	if(resultEmailAdmin === null || resultEmailClient === null || resultUserClient === null)	// Se ainda falta alguém
    		resultUserAdmin = false;
    	else if(resultEmailAdmin === true && resultEmailClient == true && resultUserClient != null)	// Se só o usuário já tem
    		window.alert("Usuário já cadastrado.");
    	else if((resultEmailAdmin === false || resultEmailClient === false) && resultUserClient != null)	// Se já tem email e usuário
    		window.alert("Email e usuário já cadastrados.");
    }
    else{   // Se não achou o user
    	window.alert("Não achou user admin");
	    resultUserAdmin = true;
	    if(resultEmailAdmin === true && resultUserAdmin === true && resultUserClient === true){	// Se todos livres
	      	if(registerType === "client")
	      		registerClient(userName, userEmail, userUser, userPassword, userAddress, userPhone);
	      	else
	      		registerAdmin(userName, userEmail, userUser, userPassword, userPhone);
	      }
	    else if((resultEmailAdmin === false || resultEmailClient === false) && resultUserClient === true)	// Se só o email já tem
	    	window.alert("Email já cadastrado.");
    }
  };
}

// Inicia a rotina de cadastro
function cadastrar(){
	window.alert("cadastrar");
	page = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
	let address;
	let name = $("#name").val();
	let user = $("#user").val();
	let email = $("#email").val();
	let password = $("#password").val();
	if(page === "new_user.html" || page === "registrar.html")
		address = $("#address").val();
	else
		address = null;
	let phone = $("#phone").val();

	if(name === "" || email === "" || password === "" || user === ""){
		window.alert("Tenha certeza de que os campos de nome, email, usuário e senha foram preenchidos.");
		return;
	}
	if(address === "")
		address = null;
	if(phone === "")
		phone = null;

	validateUser(name, email, user, password, address, phone);
}

// Checa a senha digitada
function checkPassword(){
	let psw = $("#password").val();
	let pswRepeat = $("#psw-repeat").val();
	if(psw === pswRepeat)
		cadastrar();
	else
		window.alert("As senhas não batem.");
}

// Muda a imagem e salva link
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img')
                .attr('src', e.target.result);
                //.width(150)
                //.height(200);
            userPhoto = e.target.result;        };

        reader.readAsDataURL(input.files[0]);
    }
}
