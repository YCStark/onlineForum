'use strict'

angular.module('app')
.provider('adState', function ($stateProvider, crudStateProvider) {
	let self = this
	let config = crudStateProvider.config()

	this.$get = function (options) {
		crudStateProvider.register(options)
		return this//返回的是什么？
	}

	this.state = function (options) {
		
		if (!options.template && !options.templateUrl) {

		}
	}
})
