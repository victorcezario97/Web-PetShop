let total = 0;

for(var i=0; i<carrinho.length; i++){
	let child = document.createElement("a");
	console.log(carrinho[i]);
	document.getElementById("div_prods").appendChild(createChild(carrinho[i]));
	total += carrinho[i].price;

	document.getElementById("total").innerHTML = "TOTAL: R$" + total;
}

function createChild(prod){
	let a = document.createElement("a");
	a.setAttribute("class", "produto_block");
	a.setAttribute("href", "product.html?id=" + prod.id);

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
	pprice.innerHTML = prod.price;

	divprice.appendChild(pprice);
	divname.appendChild(pname);

	a.appendChild(img);
	a.appendChild(divname);
	a.appendChild(divprice);

	return a;
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