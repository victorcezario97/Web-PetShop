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
		console.log(request.result);
		document.getElementById('nome_admin').value = request.result.name;
		document.getElementById('username_admin').value = request.result.user;
		document.getElementById('email_admin').value = request.result.email;
		document.getElementById('telefone_admin').value = request.result.phone;
		document.getElementById('endereco_admin').value = request.result.address;
		document.getElementById('senha_admin').value = request.result.password;
	}
}