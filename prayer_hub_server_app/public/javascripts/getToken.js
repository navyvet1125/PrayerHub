localStorage.setItem('token',$('#jwts').val());

var userId = $('#user-info').val();

$.ajax({
	method: 'GET',
	url: '/users/'+userId+'/causes',
	headers:{
		"Authorization": "Bearer " + $('#jwts').val()
	}
}).success(function(causes){
	causes.forEach(function(cause){
		var $li = $('<li>');
		$li.text(cause.title);
		$('#causes-list').append($li);
	});
}).error(function(err){
	console.log(err);
});

$.ajax({
	method: 'GET',
	url: '/users/'+userId+'/pledges',
	headers:{
		"Authorization": "Bearer " + $('#jwts').val()
	}
}).success(function(causes){
	causes.forEach(function(cause){
		var $li = $('<li>');
		$li.text(cause.pledgeAt);
		$('#pledges-list').append($li);
	});
}).error(function(err){
	console.log(err);
});
