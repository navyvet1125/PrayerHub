var express = require('express');
var router = express.Router();
var Cause = require('../models/cause');
/* GET causes listing. */
router.get('/', function(req, res, next) {
	Cause.find({})
	.then(function(causes){
		res.status(200).send(causes);
	})
	.catch(function(err){
		res.status(500).send(err);
	});
});

module.exports = router;