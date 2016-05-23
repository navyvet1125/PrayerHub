var db             = require('./config/db');
var Cause 		   = require('./models/cause');
var Pledge 		   = require('./models/pledge');
var User		   = require('./models/user');

var seedUser;
var seedCause;
User.remove({})
	.then(function(){
    	return Cause.remove();
	})
	.then(function(){
		return Pledge.remove();
	})
 	.then(function(){
  		return User.create([
    		{name:'Evan Washington', email:'enavy04@gmail.com', role:'admin', city:'Inglewood' },
    	]);
  	})
  	.then(function(user){
  		seedUser = user[0];
  		console.log(seedUser);
    	return Cause.create([
    		{
    			title:'World Peace',
    			body:'Praying for the world to be at peace',
    			creator: user[0]._id,
    			category: 'General',
    			createdAt: new Date(),
    			expiration: null,
    			approved: true
    		}
    	]);
    })
    .then(function(cause){
    	seedCause = cause[0];
    	console.log(seedCause);
    	return Pledge.create([
    		{
    			user:seedUser._id,
    			cause:seedCause._id,
    			createdAt: new Date(),
    			pledgeAt: new Date(),
    			howLong: 30
    		}
    	]);

    })
    .catch(function(err){
    	console.log(err);
    })
    .then(function(pledge){
    	console.log(pledge);
    	process.exit();
    });

