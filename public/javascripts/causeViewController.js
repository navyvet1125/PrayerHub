angular
	.module('prayerHubApp')
	.controller('CauseViewController', CauseViewController)
	.filter('pledges',function(){
		//filter to dynamically render number of pledges a cause has.
	  	return function(input){
	  		if(!input){
	  			return 'This cause doesn\'t have any pledges yet.';
	  		} else {
	  			if (input ===1) return 'This cause has one pledge.';
	  			else return 'This cause has '+ input +' pledges.';
	  		}
	  	};
	});


function CauseViewController($stateParams, $http){
	var self = this;
	self.token = localStorage.getItem('token');
	self.currentCause = {};
	self.pledges = [];
	self.getCause = getCause;
	self.getPledges = getPledges;
	self.getTime = getTime;
	self.submitNewPledge = submitNewPledge;
	self.newPledge ={};
	self.hours = ['1','2','3','4','5','6','7','8','9','10','11','12'];
	self.minutes = ['00','15','30','45'];
	self.amOrPm = ['AM','PM'];

	//Get cause information
	function getCause(){
		$http({
		  method: 'GET',
		  url: '/causes/'+$stateParams.id,
		  headers:{
				"Authorization": "Bearer " + self.token
			} 
		}).then(function(response){
				self.currentCause = response.data;
			});
		self.getPledges();
	}

	//Get all the pledges for a specific cause
	function getPledges(){
		$http({
		  method: 'GET',
		  url: '/causes/'+$stateParams.id+'/pledges',
		  headers:{
				"Authorization": "Bearer " + self.token
			} 
		}).then(function(response){
				self.pledges = response.data;
			});

	}

	//Render the next available time for a pledge inside the new pledge form
	function getTime (){
		self.newPledge.date = new Date();
		var hour = self.newPledge.date.getHours();
		if (hour >12){
			hour -=12;
			self.newPledge.amOrPm = 'PM';

		} else {
			self.newPledge.amOrPm = 'AM';
			
		}
		var minute = self.newPledge.date.getMinutes();
		if(minute >45){
			hour++;
			self.newPledge.minutes = '00';
		} else if(minute > 30){
			self.newPledge.minutes = '45';
		} else if(minute > 15){
			self.newPledge.minutes = '30';
		} else {
			self.newPledge.minutes = '15';
		}
		self.newPledge.hour = hour.toString();
	}

	function submitNewPledge(){
		console.log('action taken!');
	}

	self.getTime();
	self.getCause();
}

