var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	//New Users are people who have either only recently signed up 
	//and/or have not dedicated much prayer time.
	//Contributors are people who have sent prayer or meditation  a certain number of times
	//Contributors are able to create new causes.
	//Admin users can add or remove anyone, change anyone's role, and can add,
	//approve, or remove causes.  
	role: {type: 'String', enum: [
	    'new User',
	    'contributer', 
	    'admin' 
	]},
	name: String,
	avatar: String,
	email: String,
	city: String,

	fb_access_token: String,
	twitter_access_token: String,
	google_access_token: String,
	password: String,
});

//search users by role
userSchema.statics.findByRole = function(role, cb){
	return this.find({role: role}, cb);
};

userSchema.statics.searchNameAndRole = function(name, role, cb){
	this.find({role: role}, function(err, users){
		if(err) return err;
		var person;
		users.forEach(function(user){
			console.log(user.name);
			if(user.name.toLowerCase() === name.toLowerCase())person = user;
		});
		return cb(err, person);
	});
};

var User = mongoose.model('User', userSchema);

module.exports = User;