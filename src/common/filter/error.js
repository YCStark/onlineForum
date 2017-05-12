'use strict'

angular.module('app')
	.filter('error', function (Errors) {
		return function (name, customMessage) {
			var errors = angular.extend({}, Errors, customMessage);
			return errors[name] || name;
		};
	});