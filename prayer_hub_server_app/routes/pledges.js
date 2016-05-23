var express = require('express');
var router = express.Router();
var pledgesController = require('../controllers/pledges_controller');

/* GET pledges listing and create new pledges*/
router.route('/')
	.get(pledgesController.index)
	.post(pledgesController.create);

/*Show, update, and destroy a particular pledge*/
router.route('/:id')
	.get(pledgesController.show)
	.put(pledgesController.update)
	.delete(pledgesController.delete);

module.exports = router;