var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users_controller');
var tokens = require('../controllers/tokens_controller');
/* GET users listing and create new users*/
router.route('/')
	.get(tokens.verify, usersController.index)
	.post(tokens.verify, usersController.create);

/*Show, update, and destroy a particular user*/
router.route('/:id')
	.get(tokens.verify, usersController.show)
	.put(tokens.verify, usersController.update)
	.delete(tokens.verify, usersController.delete);

/*Show all pledges of a user */ 
router.route('/:id/pledges')
	.get(tokens.verify, usersController.showPledges);

/*Show all causes of a user */ 
router.route('/:id/causes')
	.get(tokens.verify, usersController.showCauses);

/*Ajax call to verify if an email already exists*/
router.route('/email/:email')
	.get(tokens.verify, usersController.verifyEmail);
module.exports = router;