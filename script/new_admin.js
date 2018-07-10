$("#newAdminBtn").click(function(){
       var user = $('#user').val();
       var name = $("#name").val();
       var senha = $("#password").val();
       var email = $("#email").val();
       var telefone = $("#phone").val();
       var rua = $("#address").val();
       //var foto = "Imagens\\unknown.jpg";

       if(name.length == 0 || email.length == 0 || telefone.length == 0 || rua.length == 0 || senha.length == 0){
           alert("Preencha todos os campos, por favor!");
       }else{
           var xhr = new XMLHttpRequest();
           xhr.open("POST", "http://localhost:3000/newAdmin", true);
           xhr.setRequestHeader("Content-Type", "application/json");

           xhr.onreadystatechange = function(){
               if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                   var text = xhr.responseText;
                   if(text==="ok"){
                       console.log("deu bom");
                       alert("Cadastro efetuado com sucesso");
                       $(".main").load("loginScreen.html");
                   }else{
                       console.log("deu ruim");
                       alert("Erro ao cadastrar");
                   }
                   console.log('text:');
                   console.log(text);
               }
           };

           data = JSON.stringify({
               password : senha,
               foto : '',
               nome : name,
               email : email,
               tel : telefone,
               rua: rua,
           });
           console.log('data:');
           console.log(data);
           xhr.send(data);
       }
   });
