var page, registerType, userPhoto = null;

// Cadastra um novo admin
function registerAdmin(userName, userEmail, userUser, userPassword, userPhone){
	
	var newUser = JSON.stringify({name: userName, user: userUser, photo: userPhoto, phone: userPhone, email: userEmail, password: userPassword});

	let xhttpr = new XMLHttpRequest();
	xhttpr.open("POST", urlMongo + "admin/register", true);
	xhttpr.setRequestHeader("Content-Type", "application/json");

	xhttpr.onreadystatechange = function(){
		if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
			let resp = xhttpr.responseText;
			if(resp === "Register ok"){
				window.alert("Administrador de email " + userEmail + " cadastrado com sucesso!");

				$("#name").val("");
				$("#email").val("");
				$("#user").val("");
				$("#password").val("");
				$("#phone").val("");
				$("#img").attr('src', '../img/perfil.jpg');
				userPhoto = null;
			}
		}
		else
			window.alert("Houve um erro durante o cadastro. Por favor, tente novamente mais tarde.");
	};
	xhttpr.send(newUser);
}

// Cadastra um novo cliente
function registerClient(userName, userEmail, userUser, userPassword, userAddress, userPhone){
	// Cadastra

	//{id: 2, name: "Bolsomito", user: "mitinho", address: "Rua das mitagens, 13", photo: null, phone: "13131313", email: "mito@gmail.com", password: "123456"}
	let newUser = JSON.stringify({
		name : userName, 
		user : userUser, 
		address : userAddress, 
		photo : userPhoto, 
		phone : userPhone, 
		email : userEmail, 
		password : userPassword
	});

	let xhttpr = new XMLHttpRequest();
	xhttpr.open("POST", urlMongo + "client/register", true);
	xhttpr.setRequestHeader("Content-Type", "application/json");

	xhttpr.onreadystatechange = function(){
		if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
			let resp = xhttpr.responseText;
			if(resp === "Register ok"){
				window.alert("Cliente de email " + userEmail + " cadastrado com sucesso!");

				// Se estamos na página new_user
				if(page === "s-new_user.html"){
					$("#name").val("");
					$("#email").val("");
					$("#user").val("");
					$("#password").val("");
					$("#address").val("");
					$("#phone").val("");
					$("#img").attr('src', '../img/perfil.jpg');
					userPhoto = null;
				}
				else if(page === "s-sign_up.html"){
					let xht = new XMLHttpRequest();
					xht.open("GET", urlMongo + "client/getClientByEmail/" + userEmail, true);
					xht.setRequestHeader("Content-Type", "application/json");

					xht.onload = function(){
						console.log("gettttt");
						console.log("response = " + xht.responseText);
						let jresp = JSON.parse(xht.responseText);
						clientId = jresp._id;
					    clientName = jresp.name;
					    clientUser = jresp.user;
					    clientAddress = jresp.address;
					    clientPhoto = jresp.photo;
					    clientPhone = jresp.phone;
					    clientEmail = jresp.email;
					    clientPassword = jresp.password;
					    // Abre home/html/single/s-home.html
					    ///////// ABREEE PÁGINAAAAAAA
					    page = "./html/single/s-home.html";
					    window.location.href = page;
					};
					xht.send(null);
				}
			}
		}
	};
	xhttpr.send(newUser);
}

// Verifica se os dados podem ser cadastrados
function validateUser(userName, userEmail, userUser, userPassword, userAddress, userPhone){
	let resultEmailClient = null, resultUserClient = null, resultEmailAdmin = null, resultUserAdmin = null;

	if(page === "s-new_admin.html")
		registerType = "admin";
	else
		registerType = "client";

	try{
		let xhttpClient = new XMLHttpRequest();

		xhttpClient.open("GET", urlMongo + "client/checkEmailOrUser/" + userEmail + "/" + userUser, true);

		xhttpClient.setRequestHeader("Content-Type", "application/json");

		// Verifica disponibilidade em client
		xhttpClient.onload = function(){
			if(this.readyState == XMLHttpRequest.DONE){
				let resp = xhttpClient.responseText;
				alert("check client resp = " + resp);

				if(resp === "Error")
					window.alert("Ocorreu um erro. Tente novamente.");

				if(this.status == 200){
					if(resp === "User unavailable"){
						resultUserClient = false;
						resultEmailClient = true;

					}
					if(resp === "Email unavailable"){
						resultUserClient = true;
						resultEmailClient = false;
					}
					if(resp === "Register ok"){
						resultUserClient = true;
						resultEmailClient = true;
						// Verifica disponibilidade em admin
						let xhttpAdmin = new XMLHttpRequest();
						xhttpAdmin.open("GET", urlMongo + "admin/checkEmailOrUser/" + userEmail + "/" + userUser, true);
						xhttpAdmin.setRequestHeader("Content-Type", "application/json");

						xhttpAdmin.onload = function(){
							alert("check admin");
							if(this.readyState == XMLHttpRequest.DONE){
								let resp1 = xhttpAdmin.responseText;
								
								if(resp1 === "Error")
									window.alert("Ocorreu um erro. Tente novamente.");

								if(this.status == 200){
									if(resp1 === "User unavailable"){
										resultUserAdmin = false;
										resultEmailAdmin = true;
									}
									if(resp1 === "Email unavailable"){
										resultUserAdmin = true;
										resultEmailAdmin = false;
									}
									if(resp1 === "Register ok"){
										resultUserAdmin = true;
										resultEmailAdmin = true;
									}

									// Email e user indisponíveis
								  	if((resultUserClient === false || resultUserAdmin === false) && (resultEmailAdmin === false || resultEmailClient === false))
								  		alert("Email e usuário indisponíveis. Por favor, tente novamente.");
								  	else if((resultUserClient === false || resultUserAdmin === false) && (resultEmailAdmin === true || resultEmailClient === true))
								  		alert("Usuário indisponível. Por favor, tente novamente.");
								  	else if((resultUserClient === true || resultUserAdmin === true) && (resultEmailAdmin === false || resultEmailClient === false))
								  		alert("Email indisponível. Por favor, tente novamente.");
								  	else if((resultUserClient === true || resultUserAdmin === true) && (resultEmailAdmin === true || resultEmailClient === true)){
								  		if(registerType === "admin")
								  			registerAdmin(userName, userEmail, userUser, userPassword, userPhone);
								  		else if(registerType === "client")
								  			registerClient(userName, userEmail, userUser, userPassword, userAddress, userPhone);
								  	}
								}
							}
						};
						xhttpAdmin.send(data);
					}
				}
			}
		};

		let data = JSON.stringify({
			userEmail: userEmail, 
			userUser: userUser
		});
		xhttpClient.send(data);
	}
	catch(e){
		window.alert("Houve um erro de conexão.\nCódigo: " + e.message);
	}/*
	xhttpClient.close();
	xhttpAdmin.close();*/
}

// Inicia a rotina de cadastro
function cadastrar(thisPage){
	let address;
	let name = $("#name").val();
	let user = $("#user").val();
	let email = $("#email").val();
	let password = $("#password").val();
	if(page === "s-new_user.html" || page === "s-sign_up.html")
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
function checkPassword(thisPage){
	console.log("checkPassword");
	page = "s-sign_up.html";
	singlePage(page, null, null);
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