(function() {

    'use strict';

    // Hope you didn't forget Angular! Duh-doy.
    if (!window.angular) throw new Error('I can\'t find Angular!');

    const app = angular.module('fsaPreBuilt', []);

    app.factory('Socket', () => {
        if (!window.io) throw new Error('socket.io not found!');
        return window.io(window.location.origin);
    });

    // AUTH_EVENTS is used throughout our app to
    // broadcast and listen from and to the $rootScope
    // for important events about authentication flow.
    app.constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    });

    app.factory('AuthInterceptor', ($rootScope, $q, AUTH_EVENTS) => {
        const statusDict = {
            401: AUTH_EVENTS.notAuthenticated,
            403: AUTH_EVENTS.notAuthorized,
            419: AUTH_EVENTS.sessionTimeout,
            440: AUTH_EVENTS.sessionTimeout
        };
        return {
            responseError: (response) => {
                $rootScope.$broadcast(statusDict[response.status], response);
                return $q.reject(response)
            }
        };
    });

    app.config($httpProvider => {
        $httpProvider.interceptors.push([
            '$injector',
            function($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    });

    app.service('AuthService', function($http, Session, $rootScope, AUTH_EVENTS, $q) {

        function onSuccessfulLogin(response) {
            var user = response.data.user;
            Session.create(user);
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            return user;
        }

        // Uses the session factory to see if an
        // authenticated user is currently registered.
        this.isAuthenticated = function() {
            return !!Session.user;
        };

        this.getLoggedInUser = function(fromServer) {

            // If an authenticated session exists, we
            // return the user attached to that session
            // with a promise. This ensures that we can
            // always interface with this method asynchronously.

            // Optionally, if true is given as the fromServer parameter,
            // then this cached value will not be used.

            if (this.isAuthenticated() && fromServer !== true) {
                return $q.when(Session.user);
            }

            // Make request GET /session.
            // If it returns a user, call onSuccessfulLogin with the response.
            // If it returns a 401 response, we catch it and instead resolve to null.
            return $http.get('/session').then(onSuccessfulLogin).catch(() => {
                return null;
            });

        };

        this.login = (credentials) => {
            return $http.post('/login', credentials)
                .then(onSuccessfulLogin)
                .catch(() => {
                    return $q.reject({ message: 'Invalid login credentials.' });
                });
        };

        this.logout = () => {
            return $http.get('/logout').then(() => {
                Session.destroy();
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            });
        };

    });

    app.service('Session', function($rootScope, AUTH_EVENTS) {

        var self = this;

        $rootScope.$on(AUTH_EVENTS.notAuthenticated, () => {
            self.destroy();
        });

        $rootScope.$on(AUTH_EVENTS.sessionTimeout, () => {
            self.destroy();
        });

        this.user = null;

        this.create = function(user) {
            this.user = user;
        };

        this.destroy = function() {
            this.user = null;
        };

    });

}());
