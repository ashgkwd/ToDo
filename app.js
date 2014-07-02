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
.controller('baseCtrl', function($scope, todoStorage) {
	$scope.tasks = todoStorage.get() || []

	$scope.addTask = function() {
		var task = $scope.newTask.trim()
		if(task.length) {
			$scope.tasks.push({
			"title":task,
			"completed":false
			})

			todoStorage.put($scope.tasks)
		}
		$scope.newTask = ''
	}

	$scope.editTask = function(task) {
		$scope.tasks[$scope.tasks.indexOf(task)].editing = true
	}

	$scope.doneEdit = function(task) {
		$scope.tasks[$scope.tasks.indexOf(task)].editing = false
		todoStorage.put($scope.tasks)
	}

	$scope.removeTask = function(task) {
		$scope.tasks.splice($scope.tasks.indexOf(task), 1)
		todoStorage.put($scope.tasks)
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
.factory('todoStorage', function() {
	var STORAGEID = 'ashish-gaikwad-store'
	return {
		get: function() {
			return JSON.parse(localStorage.getItem(STORAGEID) || '[]')
		},

		put: function(tasks) {
			localStorage.setItem(STORAGEID, JSON.stringify(tasks))
		}
	}
})