angular
	.module('prayerHubApp')
	.controller('CausesController', CausesController);

function CausesController ($stateParams, $state, $http){
	var self = this;
	self.token = localStorage.getItem('token');
	self.displayCauses = displayCauses;
	self.initialize = initialize;
	self.causes = [];
	self.newCause = {};
	self.newCause.wontExpire = false;
	self.categories = ['General','Specific'];
	self.newCause.category ='General';
	self.submitCause = submitCause;
	self.unitOfTime = ['days','weeks','months'];
	self.newCause.unitOfTime='weeks';
	self.numberOfUnits = [1,2,3,4,5,6];
	self.newCause.numberOfUnits = 3;

	function submitCause(main){
		var formattedDate;
		if(self.newCause.wontExpire){
			formattedDate = null;
		} else {
			//Create a new date to serve as the expiration date of the cause
			formattedDate = new Date();
			if (self.newCause.unitOfTime ==='weeks'){
				formattedDate.setDate(formattedDate.getDate()+(self.newCause.numberOfUnits * 7));
			} else if(self.newCause.unitOfTime ==='months'){
				formattedDate.setMonth(formattedDate.getMonth()+self.newCause.numberOfUnits);
			} else {
				formattedDate.setDate(formattedDate.getDate()+self.newCause.numberOfUnits);
			}
		}

		var formattedCause = Object.assign({}, self.newCause);
		formattedCause.expiration=formattedDate;
		delete formattedCause.unitOfTime;
		delete formattedCause.numberOfUnits;
		delete formattedCause.wontExpire;
		console.log(formattedCause);

		$http({
			method: 'POST',
			url: '/causes',
			headers:{
				"Authorization": "Bearer " + self.token
			},
			data: formattedCause

		}).then(function(response){
			console.log(response);
		}).catch(function(err){
			console.log(err);
		});
	}

	function initialize(user){
		self.user = user;
		self.newCause.creator = user;
		self.newCause.creatorName = user.name;
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