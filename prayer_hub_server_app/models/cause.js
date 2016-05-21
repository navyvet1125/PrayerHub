var mongoose = require('mongoose');
var causeSchema = new mongoose.Schema({
	title: String,
	body: String,
	category: String,
	createdAt: Date,
	expiration: Date
});

causeSchema.statics.findByCategory = function(category, cb){
	return this.find({category: category}, cb);
};

var Cause = mongoose.model('Cause', causeSchema);

module.exports = Cause;