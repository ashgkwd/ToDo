angular.module('todoApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/')

	$stateProvider
		.state('base', {
			url: '/',
			templateUrl: 'base.html'
		})
		.state('base.done', {
			url: '/completed',
			templateUrl: 'base.html'
		})
		.state('base.todo', {
			url: '/todo',
			templateUrl: 'base.html'
		})
})