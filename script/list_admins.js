var request = indexedDB.open(dbName, 1); // request é um IDBOpenDBRequest
request.onsuccess = function(){
	let objectStore = db.transaction(["clients"]).objectStore("clients");

	var myIndex = objectStore.index('email');
	var getAllRequest = myIndex.getAll();
	getAllRequest.onsuccess = function() {
		document.getElementById('admin_list').appendChild(makeUL(getAllRequest.result));
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
        it.setAttribute("onClick", "getAdmin(" + array[i].id + ");");
        it.setAttribute("name", array[i].id);
        item.appendChild(it);

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

function getAdmin(admin){
	let objectStore = db.transaction(["admins"]).objectStore("admins");

	var request = objectStore.get(admin);
	request.onsuccess = function(){
		document.getElementById('nome_admin').value = request.result.name;
		document.getElementById('username_admin').value = request.result.user;
		document.getElementById('email_admin').value = request.result.email;
		document.getElementById('telefone_admin').value = request.result.phone;
		document.getElementById('endereco_admin').value = request.result.address;
		document.getElementById('senha_admin').value = request.result.password;

        document.getElementById('salvar_admin').setAttribute("onClick", "update(" + admin + ");")
	}
}

function update(id){
    // var id = document.getElementById('id_user').getAttribute("name");
    let objectStore = db.transaction(["admins"], "readwrite").objectStore("admins");

    var request = objectStore.get(id);
    request.onsuccess = function(){
        var data = request.result;

        var nome = document.getElementById('nome_admin').value;
        if(nome != null && nome != ""){
            data.name = nome;
        }
        var username = document.getElementById('username_admin').value;
        if(username != null && username != ""){
            data.user = username;
        }
        var email = document.getElementById('email_admin').value;
        if(email != null && email != ""){
            data.email = email;
        }
        var telefone = document.getElementById('telefone_admin').value;
        if(telefone != null && telefone != ""){
            data.phone = telefone;
        }
        var endereco = document.getElementById('endereco_admin').value;
        if(endereco != null && endereco != ""){
            data.address = endereco;
        }
        var senha = document.getElementById('senha_admin').value;
        if(senha != null && senha != ""){
            data.password = senha;
        }

        var updateRequest = objectStore.put(data);
        updateRequest.onsuccess = function(){
            window.alert("Alterado com sucesso!");
        }
    }

}