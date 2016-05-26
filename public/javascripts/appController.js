angular
	.module('prayerHubApp')
	.controller('AppController', AppController)
	.filter('duration',function(){
	  	return function(input){
	  		if(input < 60){
	  			return input+' min';
	  		} else {
	  			var time = input/60;
	  			if (time ===1) return time+' hr';
	  			else return time+' hrs';
	  		}
	  	};
  });

function AppController ($stateParams, $state, $http){
	var self = this;
	self.initialize = initialize;
	self.displayPledges = displayPledges;

	function initialize(user,token){
		self.user = user;
		localStorage.setItem('token',token);
		self.displayPledges();
	}
	function displayPledges(){
		var token = localStorage.getItem('token');
		$http({
		  method: 'GET',
		  url: '/users/'+self.user._id+'/pledges?limit=3',
		  headers:{
				"Authorization": "Bearer " + token
			} 
		}).then(function(response){
				self.pledges = response.data;
			});
	}
}