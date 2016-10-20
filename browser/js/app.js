'use strict';

window.app = angular.module('OpenBounty', ['fsaPreBuilt', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'angular-loading-bar', 'highcharts-ng']);


app.config(($urlRouterProvider, $locationProvider) => {
    // Hack to bypass Auth when testing the Front-End
    if (!window.testing) {
        // This turns off hashbang urls (/#about) and changes it to something normal (/about)
        $locationProvider.html5Mode(true);
        // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
        $urlRouterProvider.otherwise('/');
        // Trigger page refresh when accessing an OAuth route
        $urlRouterProvider.when('/auth/:provider', function() {
            window.location.reload();
        });
    }
});

// This app.run is for controlling access to specific states.
app.run(($rootScope, AuthService, $state) => {
    // The given state requires an authenticated user.
    var destinationStateRequiresAuth = function(state) {
        return state.data && state.data.authenticate;
    };

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', (event, toState, toParams) => {

        if (!destinationStateRequiresAuth(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (AuthService.isAuthenticated()) {
            // The user is authenticated.
            // Short circuit with return.
            return;
        }

        // Cancel navigating to new state.
        event.preventDefault();

        AuthService.getLoggedInUser().then(user => {
            // If a user is retrieved, then renavigate to the destination
            // (the second time, AuthService.isAuthenticated() will work)
            // otherwise, if no user is logged in, go to "login" state.
            if (user) {
                $state.go(toState.name, toParams);
            } else {
                $state.go('home');
            }
        });
    });
});


app.config(['cfpLoadingBarProvider', cfpLoadingBarProvider => {
    cfpLoadingBarProvider.includeSpinner = false;
}]);
