let Client = require('../Schemas/schema_client');
let express = require('express');
let router = express.Router();

/*
router.post('/newClient', function(req, res){
  console.log("Yessssss");
});
*/

// Cadastra um cliente
router.post('/register', function(req, res){
	let registerClient = new Client();

	registerClient.name = req.body.name;
	registerClient.user = req.body.user;
	registerClient.address = req.body.address;
	registerClient.photo = req.body.photo;
	registerClient.phone = req.body.phone;
	registerClient.email = req.body.email;
	registerClient.password = req.body.password;

	registerClient.save(function(err, save){
		if(err)
			return res.status(500).send();
		return res.status(200).send("Register ok");
	});
});

// Retorna um cliente dado um email
router.get('/getClient/:email', function(req, res){
	let userEmail = req.params.email;
	let jsonParam = {email : userEmail};
	console.log("getclient");
	Client.find(jsonParam, function(error, result){
		if(error)
			return res.status(404);
		if(!result)
			return res.status(200).send("Email not found");
		else
			return res.status(200).send(result);
	});
});

// Retorna se tá disponível
router.get('/checkEmailOrUser/:email/:user', function(req, res){
	let userEmail = req.params.email;
	let userUser = req.params.user;
	let jsonParamEmail = {email : userEmail};
	let jsonParamUser = {user: userUser};

	Client.find(jsonParamEmail, function(error, result){
		if(!result){
			Client.find(jsonParamUser, function(error1, result1){
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

//Verifica login
router.get('/login/:user/:password', function(req, res){
	let userIn = req.params.user;
	let userPassword = req.params.password;
	let jsonParamEmail = {email : userIn, password : userPassword};
	let jsonParamUser = {user: userIn, password : userPassword};

	Client.find(jsonParamEmail, function(error, result){
		if(!result){
			Client.find(jsonParamUser, function(error1, result1){
				if(!result1){
					res.status(200).send("Not found");
				}
				else
					return res.status(200).send("User found");
			})
		}
		else
			return res.status(200).send("Email found");
		
	});
});
module.exports = router;


// <button type="submit" class="registerbtn" onclick = "checkPassword('s-sign_up.html');">Registrar</button>