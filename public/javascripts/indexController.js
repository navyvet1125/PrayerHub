angular
	.module('prayerHubApp')
	.controller('IndexController', IndexController);

function IndexController ($stateParams, $state){
	var self = this;
	self.things = [];
	self.test= test;
	self.input = '';

	function test(){
	    console.log('This is working!');
	}
	self.test();

}