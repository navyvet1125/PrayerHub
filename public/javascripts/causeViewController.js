angular
	.module('prayerHubApp')
	.controller('CauseViewController', CauseViewController);


function CauseViewController($stateParams, $http){
	var self = this;
	self.currentCause = {};
	self.getCause = getCause;

	function getCause(){
		var token = localStorage.getItem('token');
		$http({
		  method: 'GET',
		  url: '/causes/'+$stateParams.id,
		  headers:{
				"Authorization": "Bearer " + token
			} 
		}).then(function(response){
				console.log(response.data);
				self.currentCause = response.data;
			});
	}
	self.getCause();
}

