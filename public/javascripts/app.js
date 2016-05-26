// Define a new module.  The first argument will be the name of the app.  The second argument is an
// array of dependencies.  An empty array as a second parameter is still necessary.  It is for dependencies.
angular.module('prayerHubApp',['ui.router'])
	.config(configuration);
	
function configuration($stateProvider, $urlRouterProvider) {
  //
  //
  // For any unmatched url, redirect to /search
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('index', {
      url: "/home",
      templateUrl: "partials/index.html",
      controller: 'IndexController as indexCtrl', 
    })
    .state('home', {
      url: "/",
      templateUrl: "partials/index.html",
      controller: 'IndexController as indexCtrl'
    })
    .state('causes', {
      url: "/causes",
      templateUrl: "partials/causes.html",
      controller: 'CausesController as causesCtrl'
    })
    .state('causeView', {
      url: "/causes/:id",
      templateUrl: "partials/causeView.html",
      controller: 'CauseViewController as causeViewCtrl'
    })
    .state('users', {
      url: "/users/:id",
      templateUrl: "partials/users.html",
      controller: 'UsersController as usersCtrl'
    });
}
