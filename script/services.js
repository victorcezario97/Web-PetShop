var servicePhoto = null;

// Cadastra um serviço
function register(){
	var serviceId, serviceName, serviceDesc, servicePrice, serviceCategory;
	serviceName = $("#nome_servico").val();
	serviceDesc = $("#comentarios_servico").val();
	servicePrice = $("#preco_servico").val();
	serviceCategory = $("#categoria_servico").val();

	if(serviceName === "" || servicePrice === ""){
		alert("Tenha certeza de que foram inseridos o nome e o preço do serviço.");
		return;
	}
	if(serviceDesc === "")
		serviceDesc = null;
	if(serviceCategory === "")
		serviceCategory = null;

	// Cadastra
	let objectStore = db.transaction("services", "readwrite").objectStore("services");

	var newService = {name: serviceName, description: serviceDesc, category: serviceCategory, photo: servicePhoto, price: servicePrice};
	var request = objectStore.add(newService);

	request.onsuccess = function(event){
		window.alert("O serviço " + serviceName + " foi cadastrado com sucesso!");
		$("#nome_servico").val("");
		$("#comentarios_servico").val("");
		$("#preco_servico").val("");
		$('#img').attr('src', "../img/service.jpeg");
		$("#categoria_servico").val("");
		servicePhoto = null;
	};

	request.onerror = function(event){
		window.alert("Houve um erro durante o cadastro. Por favor, tente novamente mais tarde.");
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
            servicePhoto = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}