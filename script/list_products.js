var photo = null;
$("#control").hide();

var request = indexedDB.open(dbName, 1); // request é um IDBOpenDBRequest
request.onsuccess = function(){
	let objectStore = db.transaction(["products"], "readwrite").objectStore("products");

	var myIndex = objectStore.index('name');
	var getAllRequest = myIndex.getAll();
	getAllRequest.onsuccess = function() {
		document.getElementById('prod_list').appendChild(makeUL(getAllRequest.result));
  	}
}


function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');
        var it = document.createElement('button');
        // Set its contents:
        it.appendChild(document.createTextNode(array[i].name + " (" + array[i].category + ") "));
        it.setAttribute("onClick", "getProd(" + array[i].id + ");");
        it.setAttribute("name", array[i].id);
        item.appendChild(it);

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

function getProd(prod){
	$("#control").show();
	let objectStore = db.transaction(["products"]).objectStore("products");

	var request = objectStore.get(prod);
	request.onsuccess = function(){
		document.getElementById('id_prod').innerHTML = request.result.id;
		document.getElementById('id_prod').setAttribute("name", request.result.id);
		document.getElementById('nome_prod').value = request.result.name;
		document.getElementById('descricao_prod').value = request.result.description;
		document.getElementById('qtd_prod').value = request.result.qtd;
		document.getElementById('preco_prod').value = request.result.price;
		document.getElementById('categoria_produto').value = request.result.category;
		photo = request.result.photo;
		$("$img").attr('src', photo);

		document.getElementById('salvar_prod').setAttribute("onClick", "update(" + prod + ");")

		var parent = $("#categoria_produto").val(); //get option value from parent 

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

        document.getElementById('subcategoria_produto').value = request.result.subcategory;
	}
}

function update(id){
	// var id = document.getElementById('id_user').getAttribute("name");
	let objectStore = db.transaction(["products"], "readwrite").objectStore("products");


	var request = objectStore.get(id);
	request.onsuccess = function(){
		var data = request.result;

		var nome = document.getElementById('nome_prod').value;
		if(nome != null && nome != ""){
			data.name = nome;
		}
		var desc = document.getElementById('descricao_prod').value;
		if(desc != null && desc != ""){
			data.description = desc;
		}
		var qtd = document.getElementById('qtd_prod').value;
		if(qtd != null && qtd != ""){
			data.qtd = qtd;
		}
		var preco = document.getElementById('preco_prod').value;
		if(preco != null && preco != ""){
			data.price = preco;
		}
		var cat = document.getElementById('categoria_produto').value;
		if(cat != null && cat != ""){
			data.category = cat;
		}
		var subcat = document.getElementById('subcategoria_produto').value;
		if(subcat != null && subcat != ""){
			data.subcategory = subcat;
		}

		data.photo = photo;

		var updateRequest = objectStore.put(data);
		updateRequest.onsuccess = function(){
			window.alert("Alterado com sucesso!");
		}
	}
}

function readURL(input) {
    	if (input.files && input.files[0]) {
	        var reader = new FileReader();

	        reader.onload = function (e) {
	            $('#img')
	                .attr('src', e.target.result);
	                //.width(150)
	                //.height(200);
	            photo = e.target.result;
	        };

	        reader.readAsDataURL(input.files[0]);
	    }
}