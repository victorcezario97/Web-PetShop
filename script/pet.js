var petName, petNewName, petAge, petRaca, petPhoto, petId;
	
// Finaliza o update do pet
function finishUpdate(){
	var objectStore = db.transaction(["pets"], "readwrite").objectStore("pets");
	var request = objectStore.get(petId);

	request.onerror = function(event) {
		window.alert("Erro durante a atualização. Por favor, tente novamente.");
	};

	request.onsuccess = function(event) {
	  // Obter os valores antigos
	  var data = request.result;
	  
	  // atualiza os dados
	  data.name = petNewName;
	  data.age = petAge;
	  data.raca = pet.Raca;

	  // Atualizar esse dado no banco
	  var requestUpdate = objectStore.put(data);
	   requestUpdate.onerror = function(event) {
	   	window.alert("Erro durante a atualização. Por favor, tente novamente.");
	   };
	   requestUpdate.onsuccess = function(event) {
	     window.alert("Dados atualizados com sucesso!");
	   };
	};
}

// Finaliza o cadastro do pet
function finishRegister(){
	// Cadastra
	let objectStore = db.transaction("pets", "readwrite").objectStore("pets");

	var newPet = {name: petName, age: petAge, raca: petRaca, photo: petPhoto, client: clientId};
	var request = objectStore.add(newPet);

	request.onsuccess = function(event){
		window.alert("O seu pet " + petName + " foi cadastrado com sucesso!");

		$("#name").val("");
		$("#idade_pet").val("");
		$("#raca_pet").val("");
	};

	request.onerror = function(event){
		window.alert("Houve um erro durante o cadastro. Por favor, tente novamente mais tarde.");
	};
}

// Retorna um pet dado um nome
function getPet(callback, operation){
	var index = db.transaction("pets", "readonly").objectStore("pets").index("nameAndClient");
	var request = index.get(IDBKeyRange.only([petName, clientId]));

	request.onsuccess = function(event){
		if(request.result == undefined){	// Se não encontrou o pet
			if(operation === "register")	// Se for pra registrar
				callback();
			else	// Se for pra update
				alert("Houve um erro ao retornar as informações do seu pet. Por favor, tente novamente mais tarde.");
		}
		else{	// Se encontrou o pet
			if(operation === "register")	// Se for pra registrar	
				alert("Parece que você já tem um pet com esse nome. Por favor, cadastre com outro nome.");
			else{		// Se for pra update
				petId = request.result.id;
				callback();
			}
		}
	};

	request.onerror = function(event){
		alert("Houve um erro. Por favor, tente novamente mais tarde.");
		return;
	};
}

// Início da rotina de cadastro de pet
function register(){
	petName = $("#nome_pet").val();
	petAge = $("#idade_pet").val();
	petRaca = $("#raca_pet").val();
	petPhoto = null;

	if(petName === "" || petRaca === ""){
		alert("Tenha certeza de que foram inseridos o nome e a raça do seu pet.");
		return;
	}
	if(petAge === "")
		petAge = null;

	getPet(finishRegister, "register");
}

// Atualiza os dados de um pet
function update(){
	petNewName = $("#nome_pet").val();
	petAge = $("#idade_pet").val();
	petRaca = $("#raca_pet").val();
	petPhoto = null;

	if(petNewName === "" || petRaca === ""){
		alert("Tenha certeza de que foram inseridos o nome e a raça do seu pet.");
		return;
	}
	if(petAge === "")
		petAge = null;

	getPet(finishUpdate, "update");
}

// Carrega os dados do pet
function loadDatas(){
	// As variáveis estarão setadas quando o pet for escolhido
	$("#nome_pet").val(petName);
	$("#idade_pet").val(petAge);
	$("#raca_pet").val(petRaca);
}

if(location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === "edit_pet.html")
	loadDatas();