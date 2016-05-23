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
	    'contributor', 
	    'admin' 
	], default:'new User'},
	name: {type: String, required:true},
	avatar: String,
	email: {type: String, unique:true, required: true},
	city: String,
	pledges: {type: Number, default: 0},
	fb_access_token: String,
	password: {type: String, required: true}

});

userSchema.plugin(require('mongoose-bcrypt'));

//search users by role
userSchema.statics.findByRole = function(role, cb){
	return this.find({role: role}, cb);
};
userSchema.statics.findByEmail = function(email, cb){
	return this.findOne({email: email}, cb);
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