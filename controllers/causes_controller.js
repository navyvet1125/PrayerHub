var Cause = require('../models/cause');
var controller ={};

controller.index= function(req, res, next) {
	//Returns listing of all causes
	Cause.find({})
	.then(function(causes){
		//if it worked
		res.status(200).send(causes);
	})
	.catch(function(err){
		//if it didn't work
		res.status(500).send(err);
	});
};

controller.create = function(req,res){
	//creates a new cause
	var newCause = new Cause();
	newCause.creator = req.body.creator;
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
		if(cause)res.status(200).send({status: 200, message:'Cause Successfully Deleted!'});
		else res.status(404).send({status: 404, message:'Cause not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});

};

controller.showPledges = function(req,res){
	//find and return all pledges linked to a specific cause
	Cause.findPledgesById(req.params.id)
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