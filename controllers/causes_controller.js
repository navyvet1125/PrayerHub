var User = require('../models/user');
var Cause = require('../models/cause');
var Pledge = require('../models/pledge');
var controller ={};

controller.index = function(req, res, next) {
	var query;
	console.log(req.user);
	if(req.query.limit){
		var limit = parseInt(req.query.limit);
		//measure to mitigate a potential DoS attack
		if(limit > 10) limit=10;

		query = Cause.find({}).limit(limit);
	} else {
		query = Cause.find({});
	}
	//find and return all pledges linked to a specific cause
	query.exec()
	.then(function(causes){
		//if it worked
		res.status(200).send(causes);
	})
	.catch(function(err){
		//if it didn't work
		console.log(err);
		res.status(500).send(err);
	});
};

controller.create = function(req,res){
	//creates a new cause
	var newCause = new Cause();
	newCause.creator = req.body.creator;
	newCause.creatorName = req.body.creatorName;
	newCause.title = req.body.title;
	newCause.body = req.body.body;
	newCause.category =req.body.category;
	newCause.createdAt = new Date();
	if(req.body.expiration) newCause.expiration = req.body.expiration;
	newCause.save()
	.then(function(cause){
		//if create was successful
		res.status(200).send(cause);
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.show = function(req,res){
	//Find and show cause if they exist
	Cause.findById(req.params.id)
	.then(function(cause){
		if(cause)res.status(200).send(cause);
		else res.status(404).send({status: 404, message:'Cause not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.update = function(req,res){
	//Find and update a cause
	Cause.findById(req.params.id)
		.then(function(cause){
			newCause.title = req.body.title;
			newCause.body = req.body.body;
			newCause.category =req.body.category;
			newCause.expiration = req.body.expiration;
			return cause.save();
		})
		.then(function(cause){
			if(cause)res.status(200).send(cause);
			//error handling
			else res.status(404).send({status: 404, message:'Cause not found!'});
		})
		.catch(function(err){
			//error handling
			res.status(500).send(err);
		});
};

controller.delete = function(req,res){
	//find and removes cause
	Cause.findByIdAndRemove(req.params.id)
	.then(function(cause){
		//status update based on whether or not the cause exists
		if(cause){
			Pledge.find({ cause:cause.id }).remove().exec()
			.then(function(pledges){
				res.status(200).send({status: 200, message:'Cause Successfully Deleted!'});
			}).catch(function(err){
				//error handling
				res.status(500).send(err);
			});
		}
		else res.status(404).send({status: 404, message:'Cause not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});

};

controller.showPledges = function(req,res){
	// console.log('REQUEST QUERIES', req.query);
	var query;
	if(req.query.limit){
		//measure to mitigate a potential DoS attack
		if(req.query.limit > 10) req.query.limit=10;

		query = Cause.findPledgesById(req.params.id).limit(req.query.limit);
	} else {
		query = Cause.findPledgesById(req.params.id);
	}
	//find and return all pledges linked to a specific cause
	query.exec()
		.then(function(pledges){
			if(pledges)res.status(200).send(pledges);
			//error handling
			else res.status(404).send({status: 404, message:'Cause not found!'});
		})
		.catch(function(err){
			//error handling
			res.status(500).send(err);
		});
};

module.exports = controller;