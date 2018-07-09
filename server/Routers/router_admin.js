let Admin = require('../Schemas/schema_admin'); // Schema padrão do Admin
let express = require('express');
let router = express.Router();

/*
	TODO: funções com os métodos HTTP
*/

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


module.exports = router;  //Experta essa função, usada na linha app.use('/', adminRouter);
// em app.js. Mas antes precisa fazer o require desse arquivo
