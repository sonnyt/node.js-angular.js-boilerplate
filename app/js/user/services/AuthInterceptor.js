/**
 * Auth Interceptor Service
 */
(function() {
    'use strict';

    function AuthInterceptor($location, $q, $cookieStore) {
        var Interceptor = {};

        /**
         * Request Interceptor
         * @param  {Object} config
         * @return {Object}
         */
        Interceptor.request = function request(config) {
            var token = $cookieStore.get('token');

            if (!token) return config;

            config.headers = config.headers || {};
            config.headers.Authorization = 'Bearer ' +  token;

            return config;
        };

        /**
         * Response Error Interceptor
         * @param  {Object} response
         * @return {Object}
         */
        Interceptor.responseError = function responseError(response) {
            if (response.status === 401) {
                $location.path('/login');

                // remove any stale tokens
                $cookieStore.remove('token');

                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        };

        return Interceptor;
    }

    angular
        .module('User')
        .factory('AuthInterceptorService', [
            '$location', '$q', '$cookieStore',
            AuthInterceptor
        ]);
})();
