var User = require('../models/user');
var FacebookStrategy = require('passport-facebook').Strategy;

var passportFb = function(passport){
	passport.serializeUser( function(user,done){
		done(null,user._id);
	});
	passport.deserializeUser(function(id,done){
		User.findById(id, function(err,user){
			console.log('deserializing user: ' + user);
			done(err, user);
		});
	});

	passport.use('facebook', new FacebookStrategy({
		clientID: process.env.FACEBOOK_API_KEY,
		clientSecret: process.env.FACEBOOK_API_SECRET,
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
		enableProof: true,
		profileFields: ['id', 'name','picture.type(large)', 'emails']
	}, function(access_token, refresh_token, profile, done){
		process.nextTick(function(){
			User.findOne({'email': profile.emails[0].value}, function(err,user){
				if(err) return done(err);
				if(user) {
					if(user.avatar===undefined){
						user.avatar=profile.photos[0].value;
						user.save();
					}
					return done(null, user);
				}
				else {
					var newUser = new User();
					newUser.id = profile.id;
					newUser.fb_access_token = access_token;
					newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
					newUser.email = profile.emails[0].value;
					newUser.avatar = profile.photos[0].value;
					newUser.role ='new User';
					newUser.save(function(err){
						if (err) throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));
};

module.exports = passportFb;