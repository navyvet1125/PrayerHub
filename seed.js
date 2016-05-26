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
    		{name:'Evan Washington', email:'enavy04@gmail.com', role:'admin', city:'Inglewood', pledges:2, causes:2 },
    	]);
  	})
  	.then(function(user){
  		seedUser = user[0];
    	return Cause.create([
    		{
    			title:'World Peace',
    			body:'World peace or peace on Earth is an ideal state of freedom, peace, and happiness among and within all nations and peoples. This ideal of world non-violence provides a basis for peoples and nations to willingly cooperate, either voluntarily or by virtue of a system of governance that prevents warfare.  Taken from the wikipedia article on World Peace',
    			creator: user[0]._id,
                creatorName: user[0].name,
    			category: 'General',
    			createdAt: new Date(),
    			expiration: null,
    			approved: true
    		},
                    {
                title:'Healing for Earth',
                body:'Healing the Earth, our Mother, is something that is more urgent than ever and, hopefully, it is not too late. It is, however, very much true that by healing Mother Earth we will also be healing ourselves and society. No society that is in constant combat with the natural world can every be a happy one and it will be one that, in the end, loses, and more than just the battle. excerpt from "When we heal the Earth, we heal ourselves", by Michael Smith (Veshengro)',
                creator: user[0]._id,
                creatorName: user[0].name,
                category: 'General',
                createdAt: new Date(),
                expiration: null,
                approved: true
            }
    	]);
    })
    .then(function(cause){
    	seedCause = cause[0];
    	return Pledge.create([
    		{
    			user:seedUser._id,
                userName: seedUser.name,                
                title: seedCause.title,
    			cause:seedCause._id,
    			createdAt: new Date(),
    			pledgeAt: new Date(),
    			howLong: 30
    		},
            {
                user:seedUser._id,
                userName: seedUser.name,
                title:cause[1].title,
                cause:cause[1]._id,
                createdAt: new Date(),
                pledgeAt: new Date(),
                howLong: 90
            }

    	]);

    })
    .catch(function(err){
    	console.log(err);
    })
    .then(function(pledge){
    	process.exit();
    });