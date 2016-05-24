var mongoose = require('mongoose');

var mongoUrl = process.env.PRAYER_HUB_MONGO_URI;

mongoose.connect(mongoUrl, function(err){
  if(err){
    throw err;
  }
  console.log('database connected');
});

module.exports = mongoose;
