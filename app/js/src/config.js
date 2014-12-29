(function(app) {
    'use strict';

    angular.module('App')

    .config([
        '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            $urlRouterProvider.otherwise('/');
            $locationProvider.html5Mode(true);
        }
    ]);
})(angular);
