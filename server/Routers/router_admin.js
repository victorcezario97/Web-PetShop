let Admin = require('../Schemas/schema_admin'); // Schema padrão do Admin
let express = require('express');
let router = express.Router();

/*
	TODO: funções com os métodos HTTP
*/

/*
router.post('/newAdmin', (req, res) => { //Função tem o mesmo nome do action="/newAdmin"
	//delete req.body.id;					// no form do new_admin.html
	
	console.log(req.body.name);       //Pega somente os dados importantes do fomr
	console.log(req.body.user);
	console.log(req.body.email);

	var obj = {
     	name : req.body.name,       //Pega somente os dados importantes do fomr
			user : req.body.user,
			email : req.body.email,
     	password : req.body.password,
     	photo : req.body.photo,
     	phone: req.body.phone
	};

	console.log(obj);

	var myData = new Admin(obj); //Cria um "objeto" do Schema e insere os dados nele
	console.log(myData);
    myData.save() //Salva no banco (O banco é definido app.js(mongodb://localhost:27017/mydb"))
        .then(item => {  //No caso é o mydb. E a coleção é definada no schema_admin
            console.log("1 document inserted"); //que no caso é
        }).catch(err => {    //mongoose.model('admin', adminSchema); admin
            res.status(400).send("Não foi possível salvar o dado\n" + err);
        });
});
*/

// Cadastra um admin
router.post('/register', function(req, res){
    let registerAdmin = new Admin();

    registerAdmin.name = req.body.name;
    registerAdmin.user = req.body.user;
    registerAdmin.photo = req.body.photo;
    registerAdmin.phone = req.body.phone;
    registerAdmin.email = req.body.email;
    registerAdmin.password = req.body.password;

    registerAdmin.save(function(err, save){
        if(err)
            return res.status(500).send();
        return res.status(200).send("Register ok");
    });
});

// Retorna um admine dado um email
router.get('/getAdmin/:email', function(err, res){
    let userEmail = req.params.email;
    let jsonParam = {email : userEmail};

    Admin.find(jsonParam, function(error, result){
        if(error)
            return res.status(404);
        if(!result)
            return res.status(200).send("Email not found");
        else
            return res.status(200).send(result);
    });
});

// Retorna se tá disponível
router.get('/checkEmailOrUser/:email/:user', function(err, res){
    let userEmail = req.params.email;
    let userUser = req.params.user;
    let jsonParamEmail = {email : userEmail};
    let jsonParamUser = {user: userUser};

    Admin.find(jsonParamEmail, function(error, result){
        if(!result){
            Admin.find(jsonParamUser, function(error1, result1){
                if(!result1){
                    res.status(200).send("Register ok");
                }
                else
                    return res.status(200).send("User unavailable");
            })
        }
        else
            return res.status(200).send("Email unavailable");
        
    });
});

module.exports = router;  //Experta essa função, usada na linha app.use('/', adminRouter);
// em app.js. Mas antes precisa fazer o require desse arquivo
