var photo = null;
$("#control").hide();

var request = indexedDB.open(dbName, 1); // request é um IDBOpenDBRequest
request.onsuccess = function(){
	let objectStore = db.transaction(["services"], "readwrite").objectStore("services");

	var myIndex = objectStore.index('name');
	var getAllRequest = myIndex.getAll();
	getAllRequest.onsuccess = function() {
		document.getElementById('serv_list').appendChild(makeUL(getAllRequest.result));
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
        it.setAttribute("onClick", "getServ(" + array[i].id + ");");
        it.setAttribute("name", array[i].id);
        item.appendChild(it);

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

function getServ(serv){
	$("#control").show();
	let objectStore = db.transaction(["services"]).objectStore("services");

	var request = objectStore.get(serv);
	request.onsuccess = function(){
		document.getElementById('id_serv').innerHTML = request.result.id;
		document.getElementById('id_serv').setAttribute("name", request.result.id);
		document.getElementById('nome_serv').value = request.result.name;
		document.getElementById('descricao_serv').value = request.result.description;
		document.getElementById('preco_serv').value = request.result.price;
		document.getElementById('categ_serv').value = request.result.category;
		photo = request.result.photo;
		$("#img").attr('src', photo);

		document.getElementById('salvar_serv').setAttribute("onClick", "update(" + serv + ");")
	};
}

function update(id){
	// var id = document.getElementById('id_user').getAttribute("name");
	let objectStore = db.transaction(["services"], "readwrite").objectStore("services");


	var request = objectStore.get(id);
	request.onsuccess = function(){
		var data = request.result;

		var nome = document.getElementById('nome_serv').value;
		if(nome != null && nome != ""){
			data.name = nome;
		}
		var desc = document.getElementById('descricao_serv').value;
		if(desc != null && desc != ""){
			data.description = desc;
		}

		var preco = document.getElementById('preco_serv').value;
		if(preco != null && preco != ""){
			data.price = preco;
		}
		var cat = document.getElementById('categ_serv').value;
		if(cat != null && cat != ""){
			data.category = cat;
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