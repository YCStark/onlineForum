'use strict'

angular.module('app')

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state({
        name: 'app',
        url: '/app',
        abstract: true,
        templateUrl: 'common/template/myApp.html',
    })

    .state({
        name: 'app.home',
        url: '/home',
        templateUrl: 'common/template/home.html'
    })
        
    $urlRouterProvider.otherwise('/app/home');
})