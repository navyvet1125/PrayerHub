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


function CauseViewController($state, $stateParams, $http){
	var self = this;
	self.token = localStorage.getItem('token');
	self.currentCause = {};
	self.pledges = [];
	self.getCause = getCause;
	self.getPledges = getPledges;
	self.getTime = getTime;
	self.submitNewPledge = submitNewPledge;
	self.newPledge ={};
	self.currentUserHasAPledge = false;
	self.newPledge.howLong = 15;
	self.hours = ['1','2','3','4','5','6','7','8','9','10','11','12'];
	self.minutes = ['00','15','30','45'];
	self.howLong = [15,30,45,60,90,120];
	self.amOrPm = ['AM','PM'];
	self.initialize = initialize;
	self.unPledge = unPledge;
	self.deleteCause = deleteCause;

	function initialize(user){
		self.user = user;
		self.getTime();
		self.getCause();

	}

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
				self.getPledges();
		}).catch(function(err){
			$state.go('error',{error:err.data.message});
		});
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
				for(var i = 0; i < self.pledges.length;i++){
					if (self.pledges[i].user === self.user._id){
						self.currentUserHasAPledge = true;
						break;
					}
				}
		}).catch(function(err){
			$state.go('error',{error:err.data.message});
		});

	}

	//Render the next available time for a pledge inside the new pledge form
	function getTime (){
		self.newPledge.date = new Date();
		var hour = self.newPledge.date.getHours();
		if (hour >12){
			hour -=12;
			if(hour === 12 ){
				//if the next available date takes place the next day
				self.newPledge.amOrPm = 'AM';
				var nextDay = self.newPledge.date.getDate() + 1;
				self.newPledge.date.setDate(nextDay);
			} else {
				self.newPledge.amOrPm = 'PM';
			}

		} else {
			if(hour === 12 ){
				self.newPledge.amOrPm = 'PM';
			} else {
				self.newPledge.amOrPm = 'AM';
			}
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

	function submitNewPledge(main){
		//Make the month a double digit string number from 01 to 12
		var monthFormatter =(self.newPledge.date.getMonth()+1).toString();
		if(monthFormatter.length === 1) monthFormatter = "0"+monthFormatter;

		//Bring all the components together to be formatted into a new date
		var newTime = self.newPledge.date.getFullYear().toString();
		newTime +='/'+monthFormatter;
		newTime +='/'+self.newPledge.date.getDate().toString();
		newTime +=' '+self.newPledge.hour+':'+self.newPledge.minutes+' '+self.newPledge.amOrPm;
		var formattedPledge ={
			user: main.user,
			userName: main.user.name,
			cause: self.currentCause,
			title: self.currentCause.title,
			howLong: self.newPledge.howLong,
			pledgeAt: new Date(newTime)
		};
		$http({
			method: 'POST',
			url: '/pledges',
			headers:{
				"Authorization": "Bearer " + self.token
			},
			data: formattedPledge

		}).then(function(response){
			if(response.status===200){
				$http({
					method: 'PUT',
					url: '/users/'+main.user._id,
					headers:{
						"Authorization": "Bearer " + self.token
					},
					data: {pledges:main.user.pledges+1}
				})
				.then(function(response){
					//update all layers of the SPA to changes made
					main.user = response.data;
					main.displayPledges();
					self.getPledges();
				})
				.catch(function(err){
					$state.go('error',{error:err.data.message});
				});
			}
		}).catch(function(err){
			$state.go('error',{error:err});
		});
	}

	function unPledge(main){
		$http({
			method: 'GET',
			url: '/users/'+main.user._id+'/pledges',
			headers:{
				"Authorization": "Bearer " + self.token
			},
		}).then(function(response){
			var pledges = response.data;
			var targetPledge;
			for (var i =0; i<pledges.length;i++){
				if (self.pledges[i].cause === self.currentCause._id){
					targetPledge = self.pledges[i]._id;
					break;
				}
			}
			$http({
				method: 'DELETE',
				url: '/pledges/'+targetPledge,
				headers:{
					"Authorization": "Bearer " + self.token
				},
			}).then(function(response){
				if(response.status===200){
					$http({
						method: 'PUT',
						url: '/users/'+main.user._id,
						headers:{
							"Authorization": "Bearer " + self.token
						},
						data: {pledges:main.user.pledges-1}
					})
					.then(function(response){
						//update all layers of the SPA to changes made
						main.user = response.data;
						main.displayPledges();
						self.getPledges();
						self.currentUserHasAPledge = false;

					})
					.catch(function(err){
						$state.go('error',{error:err});
					});
				}
			}).catch(function(err){
				$state.go('error',{error:err});
			});
		}).catch(function(err){
			$state.go('error',{error:err});
		});

	}

	function deleteCause(main){
		if(confirm('Are you sure you want to delete this cause?')){
			$http({
				method: 'DELETE',
				url: '/causes/'+ self.currentCause._id,
				headers:{
					"Authorization": "Bearer " + self.token
				},
			}).then(function(response){
				if(response.status===200){
					$http({
						method: 'GET',
						url: '/users/'+self.currentCause.creator,
						headers:{
							"Authorization": "Bearer " + self.token
						},
					}).then(function(response){
						if(response.status===200){
							$http({
								method: 'PUT',
								url: '/users/'+response.data._id,
								headers:{
									"Authorization": "Bearer " + self.token
								},
								data: {causes:response.data.causes-1}
							}).then(function(response){
								if(response.data._id===main.user._id){
									main.user = response.data;
								}
								$state.go('causes');
							}).catch(function(err){
								$state.go('error',{error:err});
							});
						}
					}).catch(function(err){
						$state.go('error',{error:err});
					});
				}
			}).catch(function(err){
				$state.go('error',{error:err});
			});
		}
	}
}