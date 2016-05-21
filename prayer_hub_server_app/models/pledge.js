var mongoose = require('mongoose');
var User = require('./user');
var Cause = require('./cause');

var pledgeSchema = new mongoose.Schema({
	user: User,
	cause: Cause,
	createdAt: Date,
	pledgeAt: Date
});

pledgeSchema.statics.findByCategory = function(category, cb){
	return this.find({category: category}, cb);
};

var Pledge = mongoose.model('Pledge', pledgeSchema);

module.exports = Pledge;