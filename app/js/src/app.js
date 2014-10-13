(function(app) {
    'use strict';

    /**
    * App Module
    *
    * Main module that loads everything
    */
    angular.module('App', ['ngCookies', 'ngResource', 'ui.router', 'ui.bootstrap', 'User'])

    .run([
        '$rootScope', '$location',
        function($rootScope, $location) {
            /**
             * Change <body> class
             * it sets state name and action
             */
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                if (toState.name) {
                    var pieces = toState.name.split('.');

                    $rootScope.pageClass = pieces.join(' ');
                }
            });
        }
    ]);
})(angular);
