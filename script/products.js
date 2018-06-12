var productPhoto = null;

// Cadastra um produto
function register(){
	var productId, productName, productQtd, productDesc, productPrice, productCategory;
	productName = $("#nome_produto").val();
	productDesc = $("#comentarios_produto").val();
	productQtd = $("#qtd_produto").val();
	productPrice = $("#preco_produto").val();
	productCategory = $("#categoria_produto").val();
	productSubcategory = $("#subcategoria_produto").val();

	if(productName === "" || productPrice === "" || productCategory === "" || productSubcategory === ""){
		alert("Tenha certeza de que foram inseridos o nome, o preço, a categoria e a subcategoria do produto.");
		return;
	}
	if(productQtd === "")
		productQtd = -1;
	if(productDesc === "")
		productDesc = null;

	// Cadastra
	let objectStore = db.transaction("products", "readwrite").objectStore("products");

	var newProduct = {name: productName, description: productDesc, qtd: productQtd, photo: productPhoto, price: productPrice, category: productCategory, subcategory: productSubcategory};
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

var cachorro = [
    {display: "Alimentos", value: "alimentos" }, 
    {display: "Acessórios", value: "acessorios" }, 
    {display: "Higiene", value: "higiene" }];

var gato = cachorro;

var farmacia = [
    {display: "Vermífugo", value: "vermifugo" }, 
    {display: "Antipulga", value: "antipulga" }, 
    {display: "Eutanásia", value: "eutanasia" }];

var mais = [
    {display: "Peixes", value: "peixes" }, 
    {display: "Roedores", value: "roedores" }, 
    {display: "Cobras", value: "cobras" }];

//If parent option is changed
$("#categoria_produto").change(function() {

        var parent = $(this).val(); //get option value from parent 

        switch(parent){ //using switch compare selected option and populate child
              case 'cachorro':
                list(cachorro);
                break;
              case 'gato':
                list(gato);
                break;              
              case 'farmacia':
                list(farmacia);
                break;  
              case 'mais':
                list(mais);
                break;  
            default: //default child option is blank
                $("#subcategoria_produto").html('');  
                break;
           }
});

//function to populate child select box
function list(array_list)
{
    $("#subcategoria_produto").html(""); //reset child options
    $(array_list).each(function (i) { //populate child options 
        $("#subcategoria_produto").append("<option value=\""+array_list[i].value+"\">"+array_list[i].display+"</option>");
    });
}