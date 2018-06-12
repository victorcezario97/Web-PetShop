var request = indexedDB.open(dbName, 1); // request é um IDBOpenDBRequest
request.onsuccess = function(){
	let objectStore = db.transaction(["products"]).objectStore("products");

	var myIndex = objectStore.index('id');
	var getAllRequest = myIndex.getAll();
	getAllRequest.onsuccess = function() {
		var list = getAllRequest.result;

		for(var i=0; i<list.length; i++){
			var a = createChild(list[i]);
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
	var cn = document.getElementById(prod.category).childNodes;
	for(i=0; i<cn.length; i++){
		if(cn[i].id == prod.category+"_"+prod.subcategory){
			cn[i].appendChild(child);
			break;
		}
		
	}
	//console.log(cn);
}

function createChild(prod){
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

	let btn = document.createElement("button");
	btn.setAttribute("onclick", "addCart(" + prod.id + ");");
	btn.innerHTML = "Adicionar ao carrinho";
	btn.setAttribute("class", "mybtn");
	btn.setAttribute("name", prod.id);
	btn.setAttribute("style", "margin: auto; display: block");
	
	let divouter = document.createElement("div");
	divouter.appendChild(a);
	divouter.appendChild(btn);
	
	divouter.setAttribute("style", "display: inline-block; vertical-align: middle;");

	return divouter;
}

function addCart(id){
	if(id != null){
	var request = indexedDB.open(dbName, 1); // request é um IDBOpenDBRequest
	request.onsuccess = function(){
		let objectStore = db.transaction(["products"]).objectStore("products");

		var request2 = objectStore.get(parseInt(id));
		request2.onsuccess = function(){

			if(request2.result == undefined) window.alert("Produto não encontrado!");
			else{
				carrinho.push(request2.result);
				
				sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
				window.alert("Produto adicionado ao carrinho!");
			}
		}
	}
}else{
	window.alert("Produto não encontrado!");
}
}

