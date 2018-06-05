var request = indexedDB.open(dbName, 1); // request é um IDBOpenDBRequest
request.onsuccess = function(){
	let objectStore = db.transaction(["clients"], "readwrite").objectStore("clients");

	var myIndex = objectStore.index('email');
	var getAllRequest = myIndex.getAll();
	getAllRequest.onsuccess = function() {
		document.getElementById('user_list').appendChild(makeUL(getAllRequest.result));
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
        it.appendChild(document.createTextNode(array[i].user + " / " + array[i].email));
        it.setAttribute("onClick", "getUser(" + array[i].id + ");");
        it.setAttribute("name", array[i].id);
        item.appendChild(it);

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

function getUser(client){
	let objectStore = db.transaction(["clients"]).objectStore("clients");

	var request = objectStore.get(client);
	request.onsuccess = function(){
		document.getElementById('id_user').innerHTML = request.result.id;
		document.getElementById('id_user').setAttribute("name", request.result.id);
		document.getElementById('nome_user').value = request.result.name;
		document.getElementById('username_user').value = request.result.user;
		document.getElementById('email_user').value = request.result.email;
		document.getElementById('telefone_user').value = request.result.phone;
		document.getElementById('endereco_user').value = request.result.address;
		document.getElementById('senha_user').value = request.result.password;

		document.getElementById('salvar_user').setAttribute("onClick", "update(" + client + ");")
	}
}

function update(id){
	// var id = document.getElementById('id_user').getAttribute("name");
	let objectStore = db.transaction(["clients"], "readwrite").objectStore("clients");


	var request = objectStore.get(id);
	request.onsuccess = function(){
		var data = request.result;

		var nome = document.getElementById('nome_user').value;
		if(nome != null && nome != ""){
			data.name = nome;
		}
		var username = document.getElementById('username_user').value;
		if(username != null && username != ""){
			data.user = username;
		}
		var email = document.getElementById('email_user').value;
		if(email != null && email != ""){
			data.email = email;
		}
		var telefone = document.getElementById('telefone_user').value;
		if(telefone != null && telefone != ""){
			data.phone = telefone;
		}
		var endereco = document.getElementById('endereco_user').value;
		if(endereco != null && endereco != ""){
			data.address = endereco;
		}
		var senha = document.getElementById('senha_user').value;
		if(senha != null && senha != ""){
			data.password = senha;
		}

		var updateRequest = objectStore.put(data);
		updateRequest.onsuccess = function(){
			window.alert("Alterado com sucesso!");
		}
	}
}