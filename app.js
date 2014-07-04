angular.module('todoApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider
		//.when('/', '/all')
		.otherwise('/')

	$stateProvider
		.state('base', {
			url: '',
			abstract: true,
			templateUrl: 'base.html',
			controller: 'baseCtrl'
		})
		.state('base.all', {
			url: '/',
			templateUrl: 'task-list.html',
			controller: 'allCtrl'
		})
		.state('base.done', {
			url: '/',
			templateUrl: 'task-list.html',
			controller: 'doneCtrl'
		})
		.state('base.todo', {
			url: '/',
			templateUrl: 'task-list.html',
			controller: 'todoCtrl'
		})
})
.controller('baseCtrl', function($scope, $filter, todoStorage) {
	$scope.tasks = todoStorage.get() || []

	$scope.$watch('tasks', function(newValue, oldValue) {
		var tasks = $scope.tasks
		$scope.remainingCount = $filter('filter')(tasks, {completed:false}).length
		$scope.completedCount = tasks.length - $scope.remainingCount
		if (newValue !== oldValue) {
			todoStorage.put(tasks)
		}
	}, true)

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