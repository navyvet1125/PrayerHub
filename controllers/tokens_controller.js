var jwt = require('jsonwebtoken');
var User = require('../models/user');
var secret = 'archeopteryx';
var controller = {};


controller.verify = function(req, res, next) {
  var authHeader = req.get('Authorization');
  if (!authHeader) {
    next({
      status:  401,
      message: 'Authentication failed: missing auth header'
    });
  }
  console.log('verifying token');
  var token = authHeader.split(' ')[1];
  jwt.verify(token, secret, function(err, decoded){
    if (err) return next(err);
    req.decoded = decoded;
    next();
  });
};

module.exports = controller;
