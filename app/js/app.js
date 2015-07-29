(function() {
    'use strict';

    function Run($rootScope, $location) {
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

    angular
        .module('App', [
            'ngCookies',
            'ngResource',
            'ui.router',
            'User'
        ])
        .run([
            '$rootScope', '$location',
            Run
        ]);

})();
