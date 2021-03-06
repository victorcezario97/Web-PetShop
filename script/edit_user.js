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

	  name = $("#name").val();
	  phone = $("#phone").val();
	  if(editType === "client")
	  	address = $("#address").val();

	  // atualiza os dados
	  data.name = name;
	  data.phone = phone;
	  if(editType === "client")
	  	data.address = address;
	  data.photo = photo;


	  // Atualizar esse dado no banco
	  var requestUpdate = objectStore.put(data);
	   requestUpdate.onerror = function(event) {
	   	window.alert("Erro durante a atualização. Por favor, tente novamente.");
	   };
	   requestUpdate.onsuccess = function(event) {
	     window.alert("Dados atualizados com sucesso!");
	     clientName = name;
	     sessionStorage.setItem("clientName", clientName);
	     clientPhone = phone;
	     sessionStorage.setItem("clientPhone", clientPhone);
	     if(editType === "client"){
	     	clientAddress = address;
	     	sessionStorage.setItem("clientAddress", clientAddress);
	     }
	     clientPhoto = photo;
	     sessionStorage.setItem("clientPhoto", clientPhoto);
	   };
	};
}

// Carrega os dados para edição
function loadDatas(){
	if(typeLogged === "client"){
		id = clientId;
		name = clientName;
		user = clientUser;
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
		$("#address").val(address);
	if(photo != null)
		$("#img").attr('src', photo);
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
            photo = e.target.result;        };

        reader.readAsDataURL(input.files[0]);
    }
}

function loadProfile(){
	setVariables();
	$("#name").html(clientName);
	if(clientPhone != null)
		$("#phone").html(clientPhone);
	if(clientAddress != null)
		$("#address").html(clientAddress);
	$("#email").html(clientEmail);
	$("#user").html(clientUser);
	if(clientPhoto != "null")
		$("#img").attr('src', clientPhoto);
}