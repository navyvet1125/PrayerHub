angular
	.module('prayerHubApp')
	.controller('UsersController', UsersController);

function UsersController($stateParams, $state, $http){
	var self = this;
	self.profile={};
	self.token = localStorage.getItem('token');
	self.initialize = initialize;
	self.displayCauses = displayCauses;
	self.causes = [];
	self.displayPledges = displayPledges;
	self.pledges = [];


	function initialize(user){
		self.user = user;
		$http({
		  method: 'GET',
		  url: '/users/'+ $stateParams.id,
		  headers:{
				"Authorization": "Bearer " + self.token
			} 
		}).then(function(response){
				self.profile = response.data;
				self.displayCauses();
				self.displayPledges();
			});

	}

	function displayPledges(){
		$http({
		  method: 'GET',
		  url: '/users/'+self.profile._id+'/pledges',
		  headers:{
				"Authorization": "Bearer " + self.token
			} 
		}).then(function(response){
				self.pledges = response.data;
				
			});
	}

	function displayCauses(){
		$http({
		  method: 'GET',
		  url: '/users/'+self.profile._id+'/causes',
		  headers:{
				"Authorization": "Bearer " + self.token
			} 
		}).then(function(response){
				self.causes = response.data;
				
			});
	}


}