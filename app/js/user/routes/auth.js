/**
 * Auth Routes
 */
(function() {
    'use strict';

    function AuthRoutes($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                controller: 'authController@login',
                templateUrl: '/views/user/login.html',
                unauthenticate: true,
            })
            .state('signup', {
                url: '/signup',
                controller: 'authController@signup',
                templateUrl: '/views/user/signup.html',
                unauthenticate: true,
            });
    }

    angular
        .module('User')
        .config([
            '$stateProvider', '$httpProvider',
            AuthRoutes,
        ]);
})();
