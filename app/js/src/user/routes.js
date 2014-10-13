/**
 * Routes
 */
(function(app) {
    'use strict';

    app.module('User')

    .config([
        '$stateProvider', '$httpProvider',
        function($stateProvider, $httpProvider) {
            $stateProvider

            .state('user-login', {
                url: '/login',
                controller: 'authController@login',
                templateUrl: '/app/views/user/login.html'
            })
            .state('user-signup', {
                url: '/signup',
                controller: 'authController@signup',
                templateUrl: '/app/views/user/signup.html'
            });
        }
    ]);
})(angular);
