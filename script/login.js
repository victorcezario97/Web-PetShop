// Valida o login
function validateLogin(result){
  window.alert("validateLogin");
  if(result !== null){
    // Seta as variáveis do cliente
    /*
    sessionStorage.setItem("clientId", result.id);
    sessionStorage.setItem("clientName", result.name);
    sessionStorage.setItem("clientUser", result.user);
    sessionStorage.setItem("clientAddress", result.address);
    sessionStorage.setItem("clientPhoto", result.photo);
    sessionStorage.setItem("clientPhone", result.phone);
    sessionStorage.setItem("clientEmail", result.email);
    sessionStorage.setItem("clientPassword", result.password);
    */
    clientId = result.id;
    clientName = result.name;
    clientUser = result.user;
    clientAddress = result.address;
    clientPhoto = result.photo;
    clientPhone = result.phone;
    clientEmail = result.email;
    clientPassword = result.password;
    // Abre home
    window.alert("Bem-vindo, " + clientName);
    window.location.href = "home.html";
  }
  else  // Se não
    alert("Email/usuário e/ou senha inválidos.");
}

// Chama validateLogin com result = dados do cliente, se email e senha corretos; result = null, caso contrário.
function getClient(userInput, passwordInput){
  let result = null, resultEmail = true, resultUser = true;
  
  let objectStore = db.transaction(["clients"]).objectStore("clients");
  let objectStore2 = db.transaction(["clients"]).objectStore("clients");
  
  // Procura por email
  var indexEmail = objectStore.index("email").get(userInput);
  var indexUser = objectStore2.index("user").get(userInput);
  window.alert("Até indexes");

  indexEmail.onsuccess = function(event){
    if(indexEmail.result != undefined){   // Se achou o email
      if(indexEmail.result.password === passwordInput){ // Se a senha bate
        result = event.target.result;
        validateLogin(result);
        //return;
      }
      else{   // Se a senha não bate
        if(resultUser === false){
          validateLogin(result);
          //return;
        }
        else{
          resultEmail = false;
        }
      }
    }
    else{   // Se não achou o email
      if(resultUser === false){
        validateLogin(result);
        //return;
      }
      else{
        resultEmail = false;
      }
    }
  };

  // Procura por user
  indexUser.onsuccess = function(event){
    if(indexUser.result != undefined){   // Se o user existe
      if(indexUser.result.password === passwordInput){  // Se a senha bate
        result = event.target.result;
        validateLogin(result);
        //return;
      }
      else{ // Se a senha não bate
        if(resultEmail === false){
          validateLogin(result);
          //return;
        }
        else{
          resultUser = false;
        }
      }
    }
    else{   // Se o user não existe
      if(resultEmail === false){
        validateLogin(result);
        //return;
      }
      else{
        resultUser = false;
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