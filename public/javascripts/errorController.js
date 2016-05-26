angular
	.module('prayerHubApp')
	.controller('ErrorController', ErrorController);

function ErrorController ($state, $stateParams, $http){
	var self = this;
	self.err = $stateParams.error;
	self.initialize = initialize;
	self.testUser = testUser;
	console.log(self.err);

	function initialize(user){
		self.user = user;
		console.log(self.user);
		self.testUser();
	}
	function testUser(){
		var token = localStorage.getItem('token');
		$http({
		  method: 'GET',
		  url: '/users/'+self.user._id+'/test',
		  headers:{
				"Authorization": "Bearer " + token
			} 
		}).then(function(response){
			console.log(response);
		}).catch(function(err){
			console.log(err);
		});
	}


}
