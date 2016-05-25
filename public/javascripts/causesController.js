angular
	.module('prayerHubApp')
	.controller('CausesController', CausesController);

function CausesController ($stateParams, $state, $http){
	var self = this;
	self.displayCauses = displayCauses;
	self.initialize = initialize;
	self.causes = [];
	self.newCause = {};
	self.categories = ['General','Specific'];
	self.newCause.category ='General';
	self.action = action;

	function action(main){
		console.log('taking action!');
	}

	function initialize(user){
		self.user = user;
	}


	function displayCauses(){
		var token = localStorage.getItem('token');
		$http({
		  method: 'GET',
		  url: '/causes',
		  headers:{
				"Authorization": "Bearer " + token
			} 
		}).then(function(response){
				self.causes = response.data;
			});
	}
	self.displayCauses();
}