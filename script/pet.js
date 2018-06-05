var petName, petAge, petRaca, petPhoto;

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
function getPet(callback){
	var index = db.transaction("pets", "readonly").objectStore("pets").index("nameAndClient");
	var request = index.get(IDBKeyRange.only([petName, clientId]));

	request.onsuccess = function(event){
		if(request.result == undefined)
			callback();
		else
			alert("Parece que você já tem um pet com esse nome. Por favor, cadastre com outro nome.");
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

	getPet(finishRegister);
}

// Atualiza os dados de um pet
function update(){
	var petName = $("#nome_pet").val();
	var petAge = $("#idade_pet").val();
	var petRaca = $("#raca_pet").val();
	var petPhoto = null;

	if(name === "" || raca === ""){
		alert("Tenha certeza de que foram inseridos o nome e a raça do seu pet.");
		return;
	}
	if(petAge === "")
		petIdade = null;
}