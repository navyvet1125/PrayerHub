angular
	.module('prayerHubApp')
	.controller('ErrorController', ErrorController);

function ErrorController ($state, $stateParams, $http){
	var self = this;
	self.err = $stateParams.error;
	self.initialize = initialize;

	function initialize(user){
		self.user = user;
	}
}
