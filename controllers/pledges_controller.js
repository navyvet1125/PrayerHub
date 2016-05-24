var Pledge = require('../models/pledge');
var controller ={};

controller.index= function(req, res, next) {
	//Returns listing of all pledges
	Pledge.find({})
	.then(function(pledges){
		//if it worked
		res.status(200).send(pledges);
	})
	.catch(function(err){
		//if it didn't work
		res.status(500).send(err);
	});
};

controller.create = function(req,res){
	//creates a new pledge
	var newPledge = new Pledge();
	newPledge.user = req.body.user;
	newPledge.cause = req.body.cause;
	newPledge.howLong = req.body.howLong;
	newPledge.createdAt = new Date();
	newPledge.pledgeAt = req.body.pledgeAt;
	newPledge.save()
	.then(function(pledge){
		//if create was successful
		res.status(200).send(pledge);
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.show = function(req,res){
	//Find and show pledge if they exist
	Pledge.findById(req.params.id)
	.then(function(pledge){
		if(pledge)res.status(200).send(pledge);
		else res.status(404).send({status: 404, message:'Pledge not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.update = function(req,res){
	//Find and update a pledge
	Pledge.findById(req.params.id)
		.then(function(pledge){
			newPledge.howLong = req.body.howLong;
			newPledge.pledgeAt = req.body.pledgeAt;
			return pledge.save();
		})
		.then(function(pledge){
			if(pledge)res.status(200).send(pledge);
			//error handling
			else res.status(404).send({status: 404, message:'Pledge not found!'});
		})
		.catch(function(err){
			//error handling
			res.status(500).send(err);
		});
};

controller.delete = function(req,res){
	//find and removes pledge
	Pledge.findByIdAndRemove(req.params.id)
	.then(function(pledge){
		//status update based on whether or not the pledge exists
		if(pledge)res.status(200).send({status: 200, message:'Pledge Successfully Deleted!'});
		else res.status(404).send({status: 404, message:'Pledge not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});

};



module.exports = controller;