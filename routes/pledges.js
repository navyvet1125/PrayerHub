var express = require('express');
var router = express.Router();
var pledgesController = require('../controllers/pledges_controller');
var tokens = require('../controllers/tokens_controller');
/* GET pledges listing and create new pledges*/
router.route('/')
	.get(tokens.verify, pledgesController.index)
	.post(tokens.verify, pledgesController.create);

/*Show, update, and destroy a particular pledge*/
router.route('/:id')
	.get(tokens.verify, pledgesController.show)
	.put(tokens.verify, pledgesController.update)
	.delete(tokens.verify, pledgesController.delete);

module.exports = router;