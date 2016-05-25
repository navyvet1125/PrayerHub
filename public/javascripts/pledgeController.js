	//Sets cause time to the next available time

	function getTime (){
		self.newCause.date = new Date();
		var hour = self.newCause.date.getHours();
		if (hour >12){
			hour -=12;
			self.newCause.amOrPm = 'PM';

		} else {
			self.newCause.amOrPm = 'AM';
			
		}
		var minute = self.newCause.date.getMinutes();
		if(minute >45){
			hour++;
			self.newCause.minutes = '00';
		} else if(minute > 30){
			self.newCause.minutes = '45';
		} else if(minute > 15){
			self.newCause.minutes = '30';
		} else {
			self.newCause.minutes = '15';
		}
		self.newCause.hour = hour.toString();

	}
