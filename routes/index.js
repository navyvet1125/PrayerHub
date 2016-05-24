var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var secret = 'archeopteryx';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PrayerHub'});
});

/* Dashboard */
router.get('/dashboard', function(req, res, next) {
	var token = jwt.sign(
	    {
	      user: req.user
	    },
	    secret
	 );
	res.render('dashboard', {title:'PrayerHub', user:req.user, token:token});
});
module.exports = router;
