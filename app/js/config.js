/**
 * App Config
 */
(function() {
    'use strict';

    function Config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    }

    angular
        .module('App')
        .config([
            '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
            Config
        ]);
})();
