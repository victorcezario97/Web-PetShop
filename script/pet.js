var petName, petNewName, petAge, petRaca, petPhoto = null, petId, selected = false;
	
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
	  data.raca = petRaca;
	  data.photo = petPhoto;

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
	var newPet = JSON.stringify({name: petName, age: petAge, photo: petPhoto, raca: petRaca, idClient: clientId});

	let xhttpr = new XMLHttpRequest();
	xhttpr.open("POST", urlMongo + "pet/register", true);
	xhttpr.setRequestHeader("Content-Type", "application/json");

	xhttpr.onreadystatechange = function(){
		if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
			let resp = xhttpr.responseText;
			if(resp === "Register ok"){
				window.alert(petName + " cadastrado com sucesso!");
				window.alert("O seu pet " + petName + " foi cadastrado com sucesso!");

				$("#nome_pet").val("");
				$("#idade_pet").val("");
				$("#raca_pet").val("");
				userPhoto = null;
			}
		}
		else
			window.alert("Houve um erro durante o cadastro. Por favor, tente novamente mais tarde.");
	};
	xhttpr.send(newPet);
}

// Retorna um pet dado um nome e dono
function getPet(callback, operation){
	var pet = JSON.stringify({name: petName, idClient : clientId});

	let xhttpr = new XMLHttpRequest();
	xhttpr.open("GET", urlMongo + "pet/getPetsByOwner/" + idClient + "/" + petName, true);
	xhttpr.setRequestHeader("Content-Type", "application/json");

	xhttpr.onload = function(){
		let jresp = JSON.parse(xhttpr.responseText);
		if(jresp === "Pet not found"){
			if(operation === "register")	// Se for pra registrar
				callback();
			else	// Se for pra update
				alert("Houve um erro ao retornar as informações do seu pet. Por favor, tente novamente mais tarde.");
		}
		else{
			if(operation === "register")	// Se for pra registrar	
				alert("Parece que você já tem um pet com esse nome. Por favor, cadastre com outro nome.");
			else{		// Se for pra update
				petId = responseText.id;
				callback();
			}
		}
	};
	xhttpr.send(pet);
}

// Início da rotina de cadastro de pet
function register(){
	petName = $("#nome_pet").val();
	petAge = $("#idade_pet").val();
	petRaca = $("#raca_pet").val();
	//petPhoto = null;

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
	//petPhoto = null;

	if(petNewName === "" || petRaca === ""){
		alert("Tenha certeza de que foram inseridos o nome e a raça do seu pet.");
		return;
	}
	if(petAge === "")
		petAge = null;

	getPet(finishUpdate, "update");
}

// Carrega os dados do pet na tela "edit_pet.html"
function loadPetToUpdate(){
	setVariables();
	petName = sessionStorage.getItem("petName");
	petId = sessionStorage.getItem("petId");
	petAge = sessionStorage.getItem("petAge");
	petRaca = sessionStorage.getItem("petRaca");
	petPhoto = sessionStorage.getItem("petPhoto");

	$("#nome_pet").val(petName);
	if(petAge != "null")
		$("#idade_pet").val(petAge);
	$("#raca_pet").val(petRaca);

	if(petPhoto != "null"){
		$("#img").attr('src', petPhoto);
		console.log("pet photo = " + petPhoto);
	}
}

// Carrega os dados do pet
function loadDatas(){
	// As variáveis estarão setadas quando o pet for escolhido
	$("#name").html(petName);
	$("#age").html(petAge);
	$("#raca").html(petRaca);
	$('#img').attr('src', petPhoto);
}

function loadPets(){
	let objectStore = db.transaction(["pets"], "readwrite").objectStore("pets");

	var myIndex = objectStore.index('client');
	var getAllRequest = myIndex.getAll();
	getAllRequest.onsuccess = function() {
		document.getElementById('user_list').appendChild(makeUL(getAllRequest.result));
  	}
}

/*
var index = objectStore.index("nome");
index.get("John").onsuccess = function(event) {
  alert("O SSN de John é " + event.target.result.ssn);
};
*/
/*
if(location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === "detalhes.html"){
	var requestX = indexedDB.open(dbName, 1); // request é um IDBOpenDBRequest
	requestX.onsuccess = function(){
		let objectStore = db.transaction(["pets"], "readwrite").objectStore("pets");

		var myIndex = objectStore.index('client');
		var getAllRequest = myIndex.getAll(clientId);
		console.log("request");
		getAllRequest.onsuccess = function() {
			document.getElementById('user_list').appendChild(makeUL(getAllRequest.result));
	  	};
	};
}
*/

// Popula a lista
function startPets(){
	console.log("Client ID = " + clientId);
	var objectStore = db.transaction("pets", "readwrite").objectStore("pets");

	//var myIndex = objectStore.index("client");
	objectStore.openCursor().onsuccess = function(event){
		var pet = event.target.result;
		//console.log("Pet " + pet.value.name)
		if(pet != undefined){
			if(pet.value.client == clientId)	// A key do index é 'client'. Logo, estamos perguntando se a 'client' do pet é o mesmo logado.
				document.getElementById('user_list').appendChild(makeUL(pet.value));
			pet.continue();
		}
		else
			console.log("Sem pet");
	};
}

function makeUL(pet) {
    // Create the list element:
    var list = document.createElement('ul');
    console.log("Pet before. Animal = " + pet.name);
    
	//console.log("Pet");
    // Create the list item:
    var item = document.createElement('li');
    var it = document.createElement('button');
    // Set its contents:
    it.appendChild(document.createTextNode(pet.raca + " / " + pet.name));
    it.setAttribute("onClick", "getUser(" + pet.id + ");");
    it.setAttribute("name", pet.id);
    item.appendChild(it);

    // Add it to the list:
    list.appendChild(item);

    console.log("Antes do return");
    // Finally, return the constructed list:
    return list;
}

function getUser(pet){
	selected = true;

	let objectStore = db.transaction(["pets"]).objectStore("pets");

	var request = objectStore.get(pet);
	request.onsuccess = function(event){
		petId = request.result.id;
		petName = request.result.name;
		petAge = request.result.age;
		petRaca = request.result.raca;
		petPhoto = request.result.photo;
		loadDatas();
		//document.getElementById('salvar_user').setAttribute("onClick", "update(" + pet + ");")
	};
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
            petPhoto = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function saveToUpdate(){
	if(selected === true){
		sessionStorage.setItem("petId", petId);
		sessionStorage.setItem("petName", petName);
		sessionStorage.setItem("petAge", petAge);
		sessionStorage.setItem("petRaca", petRaca);
		sessionStorage.setItem("petPhoto", petPhoto);
		window.location.href = "edit_pet.html";
	}
	else
		alert("Por favor, selecione um pet a ser editado.");
}
