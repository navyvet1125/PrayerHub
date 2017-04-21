var db             = require('./config/db');
var Cause 		   = require('./models/cause');
var Pledge 		   = require('./models/pledge');
var User		   = require('./models/user');

User.find({})
	.then(function(users){
		console.log('-------------Users-----------------');
		console.log(users);
		return Cause.find({});
	})
	.then(function(causes){
		console.log('-------------Causes----------------');
		console.log(causes);
		return Pledge.find({});
	})
    .catch(function(err){
    	console.log(err);
    })
	.then(function(pledges){
		console.log('-------------Pledges---------------');
		console.log(pledges);
    	process.exit();
	});