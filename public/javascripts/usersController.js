angular
	.module('prayerHubApp')
	.controller('UsersController', UsersController);

function UsersController($stateParams, $state, $http){
	var self = this;
	self.profile={};
	self.profileChange = false;
	self.token = localStorage.getItem('token');
	self.initialize = initialize;
	self.displayCauses = displayCauses;
	self.causes = [];
	self.displayPledges = displayPledges;
	self.pledges = [];
	self.updateInfo = updateInfo;

	function initialize(user){
		self.user = user;
		console.log(user);
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
		}).catch(function(err){
			$state.go('error',{error:err});
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

	function updateInfo(){
		$http({
			method: 'PUT',
			url: '/users/'+ self.profile._id,
			headers:{
				"Authorization": "Bearer " + self.token
			},
			data: {
				city:self.profile.city,
				bio:self.profile.bio
			}
		})
		.then(function(response){
			self.profile = response.data;
			self.profileChange = false;
			console.log(response);

		})
		.catch(function(err){
			$state.go('error',{error:err});
		});
	}


}