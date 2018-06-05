var productPhoto = null;

// Cadastra um produto
function register(){
	var productId, productName, productQtd, productDesc, productPrice, productCategory;
	productName = $("#nome_produto").val();
	productDesc = $("#comentarios_produto").val();
	productQtd = $("#qtd_produto").val();
	productPrice = $("#preco_produto").val();
	productCategory = $("#categoria_produto").val();

	if(productName === "" || productPrice === "" || productCategory === ""){
		alert("Tenha certeza de que foram inseridos o nome, o preço e a categoria do produto.");
		return;
	}
	if(productQtd === "")
		productQtd = -1;
	if(productDesc === "")
		productDesc = null;

	// Cadastra
	let objectStore = db.transaction("products", "readwrite").objectStore("products");

	var newProduct = {name: productName, description: productDesc, qtd: productQtd, photo: productPhoto, price: productPrice, category: productCategory};
	var request = objectStore.add(newProduct);

	request.onsuccess = function(event){
		window.alert("O produto " + productName + " foi cadastrado com sucesso!");
		$("#nome_produto").val("");
		$("#comentarios_produto").val("");
		$("#qtd_produto").val("");
		$("#preco_produto").val("");
		$("#categoria_produto").val("");
		$("#img").attr("src", "../img/object.jpg");
		productPhoto = null;
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
            productPhoto = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}