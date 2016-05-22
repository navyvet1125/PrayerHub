var mongoose = require('mongoose');
var User = require('./user');
var causeSchema = new mongoose.Schema({
	title: String,
	body: String,
	creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	category: String,
	createdAt: Date,
	expiration: Date
});

causeSchema.statics.findByCategory = function(category, cb){
	return this.find({category: category}, cb);
};

var Cause = mongoose.model('Cause', causeSchema);

module.exports = Cause;