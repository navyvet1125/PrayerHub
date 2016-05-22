var db             = require('./config/db');
var Cause 		   = require('./models/cause');
var Pledge 		   = require('./models/pledge');
var User		   = require('./models/user');

User.remove({})
	.then(function(){
    	return Cause.remove();
	})
 	.then(function(){
  		return User.create([
    		{name:'Evan Washington', email:'enavy04@gmail.com', role:'admin', city:'Inglewood' },
    	]);
  	})
  	.then(function(user){
  		console.log(user[0]);
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
    .catch(function(err){
    	console.log(err);
    })
    .then(function(cause){
    	console.log(cause);
    	process.exit();
    });

