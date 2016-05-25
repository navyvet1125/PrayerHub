var express = require('express');
var router = express.Router();
var causesController = require('../controllers/causes_controller');
var tokens = require('../controllers/tokens_controller');


/* GET users listing and create new users*/
router.route('/')
	.get(tokens.verify, causesController.index)
	.post(tokens.verify, causesController.create);

/*Show, update, and destroy a particular user*/
router.route('/:id')
	.get(tokens.verify, causesController.show)
	.put(tokens.verify, causesController.update)
	.delete(tokens.verify, causesController.delete);

router.route('/:id/pledges')
	.get(tokens.verify, causesController.showPledges)

module.exports = router;