let total = 0;

for(var i=0; i<carrinho.length; i++){
	let child = document.createElement("a");
	console.log(carrinho[i]);
	document.getElementById("div_prods").appendChild(createChild(carrinho[i]));	
	total += carrinho[i].price;

	document.getElementById("total").innerHTML = "TOTAL: R$" + total;
}

function createChild(prod){
	let divouter = document.createElement("div");

	let a = document.createElement("a");
	a.setAttribute("class", "produto_block");
	a.setAttribute("href", "product_details.html?id=" + prod.id);

	let img = document.createElement("img");
	img.setAttribute("alt", "Imagem do Produto");
	img.setAttribute("class", "produto_img");
	img.setAttribute("src", prod.photo);

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
	btn.setAttribute("onclick", "removeCart(" + prod.id + ");");
	btn.innerHTML = "Remover";
	btn.setAttribute("class", "mybtn");
	btn.setAttribute("name", prod.id);
	btn.setAttribute("style", "margin: auto; display: block");
	
	divouter.appendChild(a);
	divouter.appendChild(btn);
	
	divouter.setAttribute("style", "display: inline-block; vertical-align: middle;");

	return divouter;
}

function removeCart(id){
	for(i=0; i<carrinho.length; i++){
		if (carrinho[i].id == id) {
			carrinho.splice(i, 1);
			sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
			window.alert("Item removido!");
			location.reload();
		}
	}
}


// <!--  <div class="horizontal_div" id="div_prods" style="overflow: auto;">
//     <a class="produto_block" href="#">
//     <img src="" alt="Ração Royal Canin" class="produto_img">
//     <div>
//       <p class="produto_nome" >Ração Pedigree Júnior Filhotes Raças Médias e Grandes 1kg</p>
//     </div>
//     <div>
//       <p class="produto_preco">R$16,90</p>
//     </div>
//   </a> -->