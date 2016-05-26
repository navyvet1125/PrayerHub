angular
	.module('prayerHubApp')
	.controller('CausesController', CausesController)
	.filter('preview',function(){
	  	return function(input){
	  		return input.substr(0,50) + '...';
	  	};
  });

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
	self.deleteCause = deleteCause;

	function submitCause(main){
		var submittedCause;
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

		$http({
			method: 'POST',
			url: '/causes',
			headers:{
				"Authorization": "Bearer " + self.token
			},
			data: formattedCause

		}).then(function(response){
			if(response.status===200){
				submittedCause = response.data._id;
				$http({
					method: 'PUT',
					url: '/users/'+main.user._id,
					headers:{
						"Authorization": "Bearer " + self.token
					},
					data: {causes:main.user.causes+1}
				})
				.then(function(response){
					//update all layers of the SPA to changes made
					main.user = response.data;
					self.displayCauses();
					$state.go('causeView',{id: submittedCause});
				})
				.catch(function(err){
					console.log(err.data.message);
				});
			}
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

	function deleteCause(cause, main){
		if(confirm('Are you sure you want to delete this cause?')){
			$http({
				method: 'DELETE',
				url: '/causes/'+ cause._id,
				headers:{
					"Authorization": "Bearer " + self.token
				},
			}).then(function(response){
				if(response.status===200){
					$http({
						method: 'GET',
						url: '/users/'+cause.creator,
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
								self.displayCauses();
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

	self.displayCauses();
}