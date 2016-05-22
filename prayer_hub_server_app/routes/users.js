var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find({})
	.then(function(users){
		res.status(200).send(users);
	})
	.catch(function(err){
		res.status(500).send(err);
	});
});

module.exports = router;
