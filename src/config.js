var angular = require('angular');
var uiRouter = require('angular-ui-router');
import todosController from 'todos/todos';
import propertyController from 'property/property';
import singlePropertyController from 'property/singleProperty';
import aboutController from 'about/about';
import mainController from 'main/main';
import navController from 'navbar/navbar';
import registerController from 'register/register';


const app = angular.module('app', [uiRouter]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
	// body...
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home', {
		url:'/',
		template: require('main/main.html'),
		controller: mainController
	})
	.state('todos', {
		url: '/todos',
		template: require('todos/todos.html'),
		controller: todosController
	})
	.state('about',{
		url:'/about',
		template: require('about/about.html'),
		controller: aboutController
	})
	.state('register', {
		url:'/register',
		template: require('register/register.html'),
		controller: registerController

	})
	.state('property',{
		url: '/property',
		template: require('property/property.html'),
		controller: propertyController
	})
	.state('detail',{
		url: '/property/detail/:id',
		template: require('property/property.detail.html'),
		controller: singlePropertyController
	})

	$locationProvider.html5Mode(true);
});

app.run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth){
	console.log('app run');
	$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams, options){
		console.log("route change start");
		console.log(toState); 
		// console.log(toParams);
		// console.log(fromState);
		// console.log(options);


		// if(toState.url === '/register'){
		// 	$location.path('/register');
		// }else if(toState.url === '/about'){
		// 	$location.path('/');
		// }else if(!Auth.isLoggedIn()){
		// 	console.log('Deny');
		// 	$location.path('/');
		// 	// event.preventDefault();
		// }else{
		// 	console.log('Allow');
		// 	// $location.path('/property');
		// }

		
	})
}])


app.directive('navigateBar', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			curSec : '='
		}, // {} = isolate, true = child, false/undefined = no change
		controller: navController,
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'ACME', // E = Element, A = Attribute, C = Class, M = Comment
		template: require('navbar/navbar.html'),
		// templateUrl: require('navbar/navbar.html'),
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});

app.factory('Auth', function(){
	var user;

	return {
		setUser: function(aUser){
			user = aUser;
		},
		isLoggedIn: function(){
			return (user) ? user : false;
		},
		curUser: function(){
			return user;
		},
		logout: function(){
			user = '';
		}
	};
});

export default app;