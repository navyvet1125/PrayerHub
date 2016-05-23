var express = require('express');
var router = express.Router();
var causesController = require('../controllers/causes_controller');

/* GET users listing and create new users*/
router.route('/')
	.get(causesController.index)
	.post(causesController.create);

/*Show, update, and destroy a particular user*/
router.route('/:id')
	.get(causesController.show)
	.put(causesController.update)
	.delete(causesController.delete);

module.exports = router;