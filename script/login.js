// Valida o login
function validateLogin(result, type){
  if(result !== null){
    // Seta as variáveis do usuário logado
    if(type === "client"){  // Se é um cliente
      clientId = result.id;
      clientName = result.name;
      clientUser = result.user;
      clientAddress = result.address;
      clientPhoto = result.photo;
      clientPhone = result.phone;
      clientEmail = result.email;
      clientPassword = result.password;
      typeLogged = "client";
      window.alert("Bem-vindo, " + clientName);
    }
    else{                 // Se é um admin
      adminId = result.id;
      adminName = result.name;
      adminUser = result.user;
      adminPhoto = result.photo;
      adminPhone = result.phone;
      adminEmail = result.email;
      adminEmail = result.email;
      adminPassword = result.password;
      typeLogged = "admin";
      window.alert("Bem-vindo, " + adminName);
    }

    // Abre home
    window.location.href = "home.html";
  }
  else  // Se não
    alert("Email/usuário e/ou senha inválidos.");
}

// Chama validateLogin com result = dados do cliente, se email e senha corretos; result = null, caso contrário.
function getClient(userInput, passwordInput){
  let result = null, resultClientEmail = true, resultClientUser = true, resultAdminEmail = true, resultAdminUser = true;
  
  let objectStore = db.transaction(["clients"]).objectStore("clients");
  let objectStore2 = db.transaction(["clients"]).objectStore("clients");
  let objectStore3 = db.transaction(["admins"]).objectStore("admins");
  let objectStore4 = db.transaction(["admins"]).objectStore("admins");
  
  // Procura por email
  var indexEmail = objectStore.index("email").get(userInput);
  var indexUser = objectStore2.index("user").get(userInput);
  var indexEmailAdmin = objectStore3.index("email").get(userInput);
  var indexUserAdmin = objectStore4.index("user").get(userInput);
  //window.alert("Até indexes");

  indexEmail.onsuccess = function(event){
    if(indexEmail.result != undefined){   // Se achou o email
      if(indexEmail.result.password === passwordInput){ // Se a senha bate
        result = event.target.result;
        validateLogin(result, "client");
        //return;
      }
      else{   // Se a senha não bate
        if(resultClientUser === false && resultAdminUser === false && resultAdminEmail === false){
          validateLogin(result, null);
          //return;
        }
        else{
          resultClientEmail = false;
        }
      }
    }
    else{   // Se não achou o email
      if(resultClientUser === false && resultAdminUser === false && resultAdminEmail === false){
        validateLogin(result, null);
        //return;
      }
      else{
        resultClientEmail = false;
      }
    }
  };

  // Procura por user
  indexUser.onsuccess = function(event){
    if(indexUser.result != undefined){   // Se o user existe
      if(indexUser.result.password === passwordInput){  // Se a senha bate
        result = event.target.result;
        validateLogin(result, "client");
        //return;
      }
      else{ // Se a senha não bate
        if(resultClientEmail === false && resultAdminUser === false && resultAdminEmail === false){
          validateLogin(result, null);
          //return;
        }
        else{
          resultClientUser = false;
        }
      }
    }
    else{   // Se o user não existe
      if(resultClientEmail === false && resultAdminUser === false && resultAdminEmail === false){
        validateLogin(result, null);
        //return;
      }
      else{
        resultClientUser = false;
      }
    }
  }; 

  // Procura por email do admin
  indexEmailAdmin.onsuccess = function(event){
    if(indexEmailAdmin.result != undefined){   // Se achou o email
      if(indexEmailAdmin.result.password === passwordInput){ // Se a senha bate
        result = event.target.result;
        validateLogin(result, "admin");
        //return;
      }
      else{   // Se a senha não bate
        if(resultAdminUser === false && resultClientUser === false && resultClientEmail === false){
          validateLogin(result, null);
          //return;
        }
        else{
          resultAdminEmail = false;
        }
      }
    }
    else{   // Se não achou o email
      if(resultAdminUser === false && resultClientUser === false && resultClientEmail === false){
        validateLogin(result, null);
        //return;
      }
      else{
        resultAdminEmail = false;
      }
    }
  };

  // Procura por user
  indexUserAdmin.onsuccess = function(event){
    if(indexUserAdmin.result != undefined){   // Se o user existe
      if(indexUserAdmin.result.password === passwordInput){  // Se a senha bate
        result = event.target.result;
        validateLogin(result, "admin");
        //return;
      }
      else{ // Se a senha não bate
        if(resultAdminEmail === false && resultClientUser === false && resultClientEmail === false){
          validateLogin(result, null);
          //return;
        }
        else{
          resultAdminUser = false;
        }
      }
    }
    else{   // Se o user não existe
      if(resultAdminEmail === false && resultClientUser === false && resultClientEmail === false){
        validateLogin(result, null);
        //return;
      }
      else{
        resultAdminUser = false;
      }
    }
  }; 
}

function onclickLogin(){
  let userInput = $("#login").val();
  let passwordInput = $("#password").val();
  
  // Se faltou inserir algum campo
  if(userInput === "" || passwordInput === ""){
    alert("Por favor, preencha os campos de email/usuário e senha");
    return;
  }

  // Procura registro com os dados inseridos
  getClient(userInput, passwordInput); 
}