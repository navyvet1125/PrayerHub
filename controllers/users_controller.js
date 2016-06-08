var User = require('../models/user');
var Pledge = require('../models/pledge');
var controller ={};

controller.index = function(req, res) {
	//Returns listing of all users
	User.find({})
		.then(function(users){
			//if it worked
			res.status(200).send(users);
		})
		.catch(function(err){
			//if it didn't
			res.status(500).send(err);
		});
};

controller.create = function(req,res){
	//creates a new user
	var newUser = new User();
	newUser.name = req.body.name;
	newUser.email = req.body.email;
	newUser.role ='new User';
	newUser.password = req.body.password;
	newUser.save()
	.then(function(user){
		//if create was successful
		res.status(200).send(user);
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.show = function(req,res){
	//Find and show user if they exist
	User.findWithId(req.params.id)
	.then(function(user){
		if(user)res.status(200).send(user);
		else res.status(404).send({status: 404, message:'User not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.update = function(req,res){
	//Find and update a user
	User.findById(req.params.id)
	.then(function(user){
		//Update only what is applicable
		if(req.body.name) user.name = req.body.name;
		if(req.body.email) user.email = req.body.email;
		if(req.body.role) user.role = req.body.role;
		if(req.body.password) user.password = req.body.password;
		if(req.body.pledges) user.pledges = req.body.pledges;
		if(req.body.causes) user.causes = req.body.causes;
		if(req.body.city) user.city = req.body.city;
		if(req.body.bio) user.bio = req.body.bio;
		if(user.pledges >= 5 && user.role === 'new User') user.role ='contributor';
		return user.save();
	})
	.then(function(user){
		if(user)res.status(200).send(user);
		//error handling
		else res.status(404).send({status: 404, message:'User not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.delete = function(req,res){
	//find and removes user
	User.findByIdAndRemove(req.params.id)
	.then(function(user){
		//status update based on whether or not the user exists
		if(user)res.status(200).send({status: 200, message:'User Successfully Deleted!'});
		else res.status(404).send({status: 404, message:'User not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});

};

controller.verifyEmail = function(req,res){
	//queries database for a user with the requested email
	User.findByEmail(req.params.email)
		.then(function(user){
			//if the user exists return true else return false
			if(user)res.status(200).send({status: 200, email: req.params.email, exists:true});
			else res.status(200).send({status: 200, email: req.params.email, exists:false});
		})
		.catch(function(err){
			//error handling
			res.status(500).send(err);
		});

};

controller.showPledges = function(req,res){
	var query;
	if(req.query.limit){
		//measure to mitigate a potential DoS attack
		if(req.query.limit > 10) req.query.limit=10;
		query =User.findPledgesById(req.params.id).limit(req.query.limit).sort({ pledgeAt: 1 });
	}
	else {
		query =User.findPledgesById(req.params.id);
	}
	query.exec()
		.then(function(pledges){
			res.status(200).send(pledges);
		})
		.catch(function(err){
			//if it didn't
			res.status(500).send(err);
		});
};

controller.showCauses = function(req,res){
	User.findCausesById(req.params.id)
		.then(function(causes){
			//if it worked
			res.status(200).send(causes);
		})
		.catch(function(err){
			//if it didn't
			res.status(500).send(err);
		});
};
module.exports = controller;