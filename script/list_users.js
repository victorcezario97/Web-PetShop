var request = indexedDB.open(dbName, 1); // request é um IDBOpenDBRequest
request.onsuccess = function(){
	let objectStore = db.transaction(["clients"]).objectStore("clients");

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
        it.appendChild(document.createTextNode(array[i].user));
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
		console.log(request.result);
		document.getElementById('nome_user').value = request.result.name;
		document.getElementById('username_user').value = request.result.user;
		document.getElementById('email_user').value = request.result.email;
		document.getElementById('telefone_user').value = request.result.phone;
		document.getElementById('endereco_user').value = request.result.address;
		document.getElementById('senha_user').value = request.result.password;
	}
}