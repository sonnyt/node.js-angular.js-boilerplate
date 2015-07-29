/**
 * User Routes
 */
(function() {
    'use strict';

    function Config($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptorService');
    }

    function Run($rootScope, $location, AuthService) {
        $rootScope.$on('$stateChangeStart', function(event, next) {
            if(!next.unauthenticate && !AuthService.isLoggedIn()) {
                $location.path('/login');
            } else if(!next.unauthenticate) {
                AuthService.getCurrentUser().then(function(user) {
                    $rootScope.currentUser = user;
                });
            }
        });
    }

    angular
        .module('User')
        .config([
            '$httpProvider',
            Config
        ])
        .run([
            '$rootScope', '$location', 'AuthService',
            Run
        ]);
})();
