/**
 * User Routes
 */
(function() {
    'use strict';

    /**
     * User Config
     * @param {Object} $httpProvider
     */
    function Config($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptorService');
    }

    /**
     * User Run
     * @param {Object} $rootScope
     * @param {Object} $location
     * @param {Object} AuthService
     */
    function Run($rootScope, $location, AuthService) {
        $rootScope.$on('$stateChangeStart', function change(event, next) {
            if (!next.unauthenticate && !AuthService.isLoggedIn()) {
                $location.path('/login');
            } else if (!next.unauthenticate) {
                AuthService.getCurrentUser().then(function success(user) {
                    $rootScope.currentUser = user;
                });
            }
        });
    }

    angular
        .module('User')
        .config([
            '$httpProvider',
            Config,
        ])
        .run([
            '$rootScope', '$location', 'AuthService',
            Run,
        ]);
})();
