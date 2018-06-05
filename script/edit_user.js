var editType, id, name, user, address, photo, phone, email, password;

// Atualiza os dados
function update(){
	if(editType === "client")	// Cliente
		var objectStore = db.transaction(["clients"], "readwrite").objectStore("clients");
	else 	// Admin
		var objectStore = db.transaction(["admins"], "readwrite").objectStore("admins");

	var request = objectStore.get(id);

	request.onerror = function(event) {
		window.alert("Erro durante a atualização. Por favor, tente novamente.");
	};

	request.onsuccess = function(event) {
	  // Obter os valores antigos
	  var data = request.result;
	  
	  // atualiza os dados
	  data.name = name;
	  data.phone = phone;
	  if(editType === "client")
	  	data.address = address;

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

// Carrega os dados para edição
function loadDatas(){
	if(typeLogged === "client"){
		id = clientId;
		name = clientName;
		user = userName;
		address = clientAddress;
		photo = clientPhoto;
		phone = clientPhone;
		email = clientEmail;
		password = clientPassword;
		editType = "client";
	}
	// Se não for cliente, as variáveis já estarão setadas no momento que o admin escolher quem quer editar
	$("#name").val(clientName);
	$("#phone").val(clientPhone);
	if(editType === "client")
		$("#address").val(phone);
}

loadDatas();