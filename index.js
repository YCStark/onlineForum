'use strict'

angular.module('app',['ui.router'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: './biz/login/login',
				controller: 'loginController as vm'
			})
			.state('register', {
				url: '/register',
				templateUrl: './biz/register/register',
				controller: 'registerController as vm'
			})
			.state('home', {
				url: '/home',
				templateUrl: './biz/home/home',
				controller: 'homeController as vm '
			})
			.state('notFound', {
				url: '/notFound',
				templateUrl: './biz/notFound/notFound',
				controller: 'notFoundController as vm'
			})
		$urlRouterProvider.otherwise('/home');
	})
