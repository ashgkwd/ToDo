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
	}

	$scope.editTask = function(task) {
		$scope.tasks[$scope.tasks.indexOf(task)].editing = true
	}

	$scope.doneEdit = function(task) {
		$scope.tasks[$scope.tasks.indexOf(task)].editing = false
	}

	$scope.removeTask = function(task) {
		$scope.tasks.splice($scope.tasks.indexOf(task), 1)
	}
})
.controller('allCtrl', function($scope) {
	$scope.stateFilter = null
})
.controller('doneCtrl', function($scope) {
	$scope.stateFilter = {completed: true}
})
.controller('todoCtrl', function($scope) {
	$scope.stateFilter = {completed:false}
})