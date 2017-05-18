'use strict'

angular.module('app', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: './src/biz/login/login.html',
            // controller: 'loginController as vm'
        })
        .state('register', {
            url: '/register',
            templateUrl: './src/biz/register/register.html',
            controller: 'registerController as vm'
        })
        .state('home', {
            url: '/home',
            templateUrl: './src/common/template/myApp.html',
            // controller: 'homeController as vm '
        })
        .state('notFound', {
            url: '/notFound',
            templateUrl: './biz/notFound/notFound',
            controller: 'notFoundController as vm'
        })
    $urlRouterProvider.otherwise('/login');
})

.controller('loginCtrl', function($scope, $state) {
    $scope.goHome = function() {
        $state.go('home')
    }
})
