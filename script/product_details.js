var url_string = window.location.href
var url = new URL(url_string);
var id = url.searchParams.get("id");

if(id != null){
	var request = indexedDB.open(dbName, 1); // request é um IDBOpenDBRequest
	request.onsuccess = function(){
		let objectStore = db.transaction(["products"]).objectStore("products");

		var request2 = objectStore.get(parseInt(id));
		request2.onsuccess = function(){

			if(request2.result == undefined) window.alert("Produto não encontrado!");
			else{
				document.getElementById('nome_produto').innerHTML = request2.result.name;
				document.getElementById('descricao_produto').innerHTML = request2.result.description;
				document.getElementById('qtd_produto').innerHTML = request2.result.qtd;
				document.getElementById('preco_produto').innerHTML = request2.result.price;
				document.getElementById('categoria_produto').innerHTML = request2.result.category;
				document.getElementById('subcategoria_produto').innerHTML = request2.result.subcategory;
				//document.getElementById('img').setAttribute("src", request2.result.img);
				document.getElementById('cartBtn').setAttribute("onclick", "addCart(" + request2.result.id + ");");
			}
		}
	}
}else{
	window.alert("Produto não encontrado!");
}