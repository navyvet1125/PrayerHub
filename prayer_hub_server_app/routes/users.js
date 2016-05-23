var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users_controller');

/* GET users listing and create new users*/
router.route('/')
	.get(usersController.index)
	.post(usersController.create);

/*Show, update, and destroy a particular user*/
router.route('/:id')
	.get(usersController.show)
	.put(usersController.update)
	.delete(usersController.delete);

/*Ajax call to verify if an email already exists*/
router.route('/email/:email')
	.get(usersController.verifyEmail)
module.exports = router;