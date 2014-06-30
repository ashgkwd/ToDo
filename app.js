angular.module('todoApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/')

	$stateProvider
		.state('base', {
			url: '/',
			templateUrl: 'base.html',
			controller: 'baseCtrl'
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
.controller('baseCtrl', function($scope, $state) {
	$scope.tasks = []

	$scope.addTask = function() {
		var task = $scope.newTask.trim()
		if(task.length) $scope.tasks.push({
			"title":task,
			"completed":false
		})
		$scope.newTask = ''
	}

	$scope.removeTask = function(task) {
		$scope.tasks.splice($scope.tasks.indexOf(task), 1)
	}
})