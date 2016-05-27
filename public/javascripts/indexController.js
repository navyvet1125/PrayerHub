angular
	.module('prayerHubApp')
	.controller('IndexController', IndexController)
	.filter('shortName',function(){
	  	return function(input){
	  		var output = input.split(' ');
	  		return output[0]+' '+output[1][0]+'.';
	  		
	  	};
  });


function IndexController ($stateParams, $state, $http){
	var self = this;
	self.displayCauses = displayCauses;
	self.initialize = initialize;
	self.causes = [];

	function initialize(user){
		self.user = user;
	}
	function displayCauses(){
		var token = localStorage.getItem('token');
		$http({
		  method: 'GET',
		  url: '/causes?limit=10',
		  headers:{
				"Authorization": "Bearer " + token
			} 
		}).then(function(response){
				self.causes = response.data;
			});
	}
	self.displayCauses();
}