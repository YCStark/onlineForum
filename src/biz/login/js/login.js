'use strict'

angular.module('app')

.controller('loginCtrl', function($scope, $state) {
	$scope.goHome = function() {
		$state.go('home')
	}
})


