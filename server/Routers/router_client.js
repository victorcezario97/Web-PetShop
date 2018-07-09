let Client = require('../Schemas/schema_client');
let express = require('express');
let router = express.Router();

router.post('/newClient', function(req, res){
  console.log("Yessssss");
});

module.exports = router;
