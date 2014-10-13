/**
 * Auth Service
 */
(function(app) {
    'use strict';

    app.module('User')

    .factory('Auth', [
        '$location', '$rootScope', '$http', 'User', '$cookieStore', '$q',
        function($location, $rootScope, $http, User, $cookieStore, $q) {
            var currentUser = {};

            if ($cookieStore.get('token')) {
                currentUser = User.get();
            }

            return {
                login: function(user) {
                    var deferred = $q.defer();

                    $http.post('/api/auth/local', {
                        email: user.email,
                        password: user.password
                    })

                    .success(function(data) {
                        $cookieStore.put('token', data.token);

                        currentUser = User.get();

                        deferred.resolve(data);
                    })
                    .error(function(err) {
                        this.logout();

                        deferred.reject(err);
                    }.bind(this));

                    return deferred.promise;
                },

                logout: function() {
                    $cookieStore.remove('token');

                    currentUser = {};
                },

                signup: function(user) {
                    return User.save(user, function(data) {
                        $cookieStore.put('token', data.token);

                        currentUser = User.get();
                    },
                    function(err) {
                        this.logout();
                    }.bind(this)).$promise;
                },

                getCurrentUser: function() {
                    return currentUser;
                },

                isLoggedIn: function() {
                    return currentUser.hasOwnProperty('role');
                },

                isLoggedInAsync: function(callback) {
                    if (currentUser.hasOwnProperty('$promise')) {
                        currentUser.$promise.then(function() {
                            callback(true);
                        }).catch(function() {
                            callback(false);
                        });
                    } else if (currentUser.hasOwnProperty('role')) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                },

                isAdmin: function() {
                    return currentUser.role === 'admin';
                },

                getToken: function() {
                    return $cookieStore.get('token');
                }
            };
        }
    ]);

})(angular);
