var express = require('express');
var router = express.Router();
var Pledge = require('../models/pledge');
/* GET pledges listing. */
router.get('/', function(req, res, next) {
	Pledge.find({})
	.then(function(pledges){
		res.status(200).send(pledges);
	})
	.catch(function(err){
		res.status(500).send(err);
	});
});

module.exports = router;