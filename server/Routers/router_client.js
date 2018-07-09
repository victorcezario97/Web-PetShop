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
	let name = req.body.name;
	let user = req.body.user;
	let address = req.body.address;
	let photo = req.body.photo;
	let phone = req.body.phone;
	let email = req.body.email;
	let password = req.body.password;

	let registerClient = new Client();

	registerClient.name = name;
	registerClient.user = user;
	registerClient.address = address;
	registerClient.photo = photo;
	registerClient.phone = phone;
	registerClient.email = email;
	registerClient.password = password;

	registerClient.save(function(err, save){
		if(err)
			return res.status(500).send();
		return res.status(200).send("Register ok");
	});
});

// Retorna um cliente dado um email
router.get('/getClient/:email', function(err, res){
	let userEmail = req.params.email;
	let jsonParam = {email : userEmail};

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
router.get('/checkEmailOrUser/:email/:user', function(err, res){
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

module.exports = router;