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

      sessionStorage.setItem("clientId", clientId);
      sessionStorage.setItem("clientName", clientName);
      sessionStorage.setItem("clientUser", clientUser);
      sessionStorage.setItem("clientAddress", clientAddress);
      sessionStorage.setItem("clientPhoto", clientPhoto);
      sessionStorage.setItem("clientPhone", clientPhone);
      sessionStorage.setItem("clientEmail", clientEmail);
      sessionStorage.setItem("clientPassword", clientPassword);
      sessionStorage.setItem("typeLogged", typeLogged);

      window.alert("Bem-vindo, cliente " + clientName);

      // Abre home
    window.location.href = "home.html";
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
      window.alert("Bem-vindo, administrador " + adminName);

       window.location.href = "home-admin.html";
    }

  }
  else  // Se não
    alert("Email/usuário e/ou senha inválidos.");
}

// Chama validateLogin com result = dados do cliente, se email e senha corretos; result = null, caso contrário.
function getClient(userInput, passwordInput){
  try{
    let xhttpClient = new XMLHttpRequest();

    xhttpClient.open("GET", urlMongo + "client/login/" + userInput + "/" + passwordInput, true);

    xhttpClient.setRequestHeader("Content-Type", "application/json");

    // checa se existe o registro
    xhttpClient.onload = function(){
      if(this.readyState == XMLHttpRequest.DONE){
        let resp = xhttpClient.responseText;

        // Erro
        if(resp === "Error")
          window.alert("Ocorreu um erro. Tente novamente.");
        if(this.status == 200){ // Resposta
          if(resp === "Email found"){  // Se achou por email
            typeLogged = "client";
            let xht = new XMLHttpRequest();
            xht.open("GET", urlMongo + "client/getClientByEmail/" + userInput, true);
            xht.setRequestHeader("Content-Type", "application/json");

            xht.onload = function(){
              let jresp = JSON.parse(xht.responseText);
              console.log("Logou!");
              clientId = jresp._id;
              clientName = jresp.name;
              clientUser = jresp.user;
              clientAddress = jresp.address;
              clientPhoto = jresp.photo;
              clientPhone = jresp.phone;
              clientEmail = jresp.email;
              clientPassword = jresp.password;
            };
            xht.send(null);
          }
          else if(resp === "User found"){ // Se achou por user
            typeLogged = "client";
            let xht = new XMLHttpRequest();
            xht.open("GET", urlMongo + "client/getClientByUser/" + userInput, true);
            xht.setRequestHeader("Content-Type", "application/json");

            xht.onload = function(){
              let jresp = JSON.parse(xht.responseText);
              console.log("Logou!");
              clientId = jresp._id;
              clientName = jresp.name;
              clientUser = jresp.user;
              clientAddress = jresp.address;
              clientPhoto = jresp.photo;
              clientPhone = jresp.phone;
              clientEmail = jresp.email;
              clientPassword = jresp.password;
            };
            xht.send(null);
          }
          else if(resp === "Not found"){  // Nãp encontrado. Procura por admin
            let xhttpAdmin = new XMLHttpRequest();

            xhttpAdmin.open("GET", urlMongo + "admin/login/" + userInput + "/" + passwordInput, true);

            xhttpAdmin.setRequestHeader("Content-Type", "application/json");

            // checa se existe o registro
            xhttpAdmin.onload = function(){
              if(this.readyState == XMLHttpRequest.DONE){
                let resp = xhttpAdmin.responseText;
                // Erro
                if(resp === "Error")
                  window.alert("Ocorreu um erro. Tente novamente.");
                if(this.status == 200){ // Resposta
                  if(resp === "Email found"){  // Se achou por email
                    typeLogged = "admin";
                    let xht = new XMLHttpRequest();
                    xht.open("GET", urlMongo + "admin/getAdminByEmail/" + userInput, true);
                    xht.setRequestHeader("Content-Type", "application/json");

                    xht.onload = function(){
                      let jresp = JSON.parse(xht.responseText);
                      console.log("Logou!");
                      adminId = jresp._id;
                      adminName = jresp.name;
                      adminUser = jresp.user;
                      adminPhoto = jresp.photo;
                      adminPhone = jresp.phone;
                      adminEmail = jresp.email;
                      adminPassword = jresp.password;
                    };
                    xht.send(null);
                  }
                  else if(resp === "User found"){ // Se achou por user
                    let xht = new XMLHttpRequest();
                    xht.open("GET", urlMongo + "admin/getAdminByUser/" + userInput, true);
                    xht.setRequestHeader("Content-Type", "application/json");

                    xht.onload = function(){
                      let jresp = JSON.parse(xht.responseText);
                      console.log("Logou!");
                      adminId = jresp._id;
                      adminName = jresp.name;
                      adminUser = jresp.user;
                      adminPhoto = jresp.photo;
                      adminPhone = jresp.phone;
                      adminEmail = jresp.email;
                      adminPassword = jresp.password;
                    };
                    xht.send(null);
                  }
                  else if(resp === "Not found")  // Nãp encontrado
                     window.alert("E-mail/usuário e/ou senha inválidos. Tente novamente.");
                 }
               }
             };
             let data = JSON.stringify({
              user: userInput, 
              password: passwordInput
              });
              xhttpAdmin.send(data);
          }
        }
      }
    };
    let data = JSON.stringify({
      user: userInput, 
      password: passwordInput
    });
    xhttpClient.send(data);
  }
  catch(e){
    window.alert("Houve um erro de conexão.\nCódigo: " + e.message);
  }
}