angular.module('todoApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider
		.when('/', '/all')
		.otherwise('/all')

	$stateProvider
		.state('base', {
			url: '',
			abstract: true,
			templateUrl: 'base.html',
			controller: 'baseCtrl'
		})
		.state('base.all', {
			url: '/all',
			templateUrl: 'task-list.html',
			controller: 'allCtrl'
		})
		.state('base.done', {
			url: '/completed',
			templateUrl: 'task-list.html',
			controller: 'doneCtrl'
		})
		.state('base.todo', {
			url: '/todo',
			templateUrl: 'task-list.html',
			controller: 'todoCtrl'
		})
})
.controller('baseCtrl', function($scope) {
	$scope.tasks = []

	$scope.addTask = function() {
		var task = $scope.newTask.trim()
		if(task.length) $scope.tasks.push({
			"title":task,
			"completed":false
		})
		$scope.newTask = ''
		console.info($scope.tasks)
	}

	$scope.removeTask = function(task) {
		$scope.tasks.splice($scope.tasks.indexOf(task), 1)
	}
})
.controller('allCtrl', function($scope) {
	console.log('doneCtrl is active')
	$scope.stateFilter = null
})
.controller('doneCtrl', function($scope) {
	console.log('doneCtrl is active')
	$scope.stateFilter = {completed: true}
})
.controller('todoCtrl', function($scope) {
	console.log('todoCtrl is active')
	$scope.stateFilter = {completed:false}
})