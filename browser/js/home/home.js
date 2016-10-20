'use strict';

app.config($stateProvider => {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
            //hacky way of redirecting to user state if already logged in
            //I don't like it - MS
            checkLoggedIn: function(AuthService, $rootScope, $state) {
                return AuthService.getLoggedInUser()
                    .then(user => {
                        if (!user) return;
                        $state.go('user');
                    });
            }
        }
    });
});
