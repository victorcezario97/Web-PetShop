var request = indexedDB.open(dbName, 1); // request é um IDBOpenDBRequest
request.onsuccess = function(){
	let objectStore = db.transaction(["products"]).objectStore("products");

	var myIndex = objectStore.index('id');
	var getAllRequest = myIndex.getAll();
	getAllRequest.onsuccess = function() {
		var list = getAllRequest.result;

		for(var i=0; i<list.length; i++){
			var a = createChild(list[i]);
			console.log(list[i].category);
			placeChild(a, list[i]);
		}


  	}
}

// <a class="produto_block" href="produto.html">
// 				<img src="../img/racao_pedigree.png" alt="Ração Royal Canin" class="produto_img">
// 				<div>
// 					<p class="produto_nome" >Ração Pedigree Júnior Filhotes Raças Médias e Grandes 1kg</p>
// 				</div>
// 				<div>
// 					<p class="produto_preco">R$16,90</p>
// 				</div>
// 			</a>



function placeChild(child, prod){
	document.getElementById(prod.category).getElementById(prod.subcategory).appendChild(child);
}

function createChild(prod){
	let divouter = document.createElement("div");

	let a = document.createElement("a");
	a.setAttribute("class", "produto_block");
	a.setAttribute("href", "product_details.html?id=" + prod.id);

	let img = document.createElement("img");
	img.setAttribute("alt", "Imagem do Produto");
	img.setAttribute("class", "produto_img");
	img.setAttribute("src", prod.img);

	let divname = document.createElement("div");

	let pname = document.createElement("p");
	pname.setAttribute("class", "produto_nome");
	pname.innerHTML = prod.name;

	let divprice = document.createElement("div");	

	let pprice = document.createElement("p");
	pprice.setAttribute("class", "produto_preco");
	pprice.innerHTML = "R$" + prod.price;



	divprice.appendChild(pprice);
	divname.appendChild(pname);

	a.appendChild(img);
	a.appendChild(divname);
	a.appendChild(divprice);

	return a;
}


