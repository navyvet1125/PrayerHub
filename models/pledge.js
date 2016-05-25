var mongoose = require('mongoose');
var User = require('./user');
var Cause = require('./cause');

var pledgeSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //Who made the pledge
	cause: {type: mongoose.Schema.Types.ObjectId, ref: 'Cause'}, //The cause they pledged for
	title: String,
	createdAt: Date, //When the pledge was made
	pledgeAt: Date,  //Date and time to be pledged
	howLong: Number  //How long the pledge is for
});

pledgeSchema.statics.findByCause = function(cause, cb){
	return this.find({cause: cause}, cb);
};

var Pledge = mongoose.model('Pledge', pledgeSchema);

module.exports = Pledge;