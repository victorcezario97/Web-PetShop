let Admin = require('../Schemas/schema_admin');
let express = require('express');
let router = express.Router();

/*
	TODO: funções com os métodos HTTP
*/

router.post('/newAdmin', (req, res) => {
	delete req.body.id;
	var obj = {
     	name : req.body.name,
     	email : req.body.email,
     	password : req.body.password,
     	photo : req.body.photo,
     	phone: req.body.photo
	};

	var myData = new Admin(obj);
    myData.save()
        .then(item => {
            console.log("1 document inserted");
        })
        .catch(err => {
            res.status(400).send("Não foi possível salvar o dado");
        });
});


module.exports = router;