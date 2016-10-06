app.directive('navbar', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function(scope) {

            scope.items = [
                { label: 'Donate', state: 'donate' },
                { label: 'Fund your project', state: 'fundProject' },
            ];

            scope.privateItems = [
                { label: 'Manage Projects', state: 'manageProjects', auth: true }
            ]

            scope.user = null;

            scope.isLoggedIn = function() {
                return AuthService.isAuthenticated();
            };

            scope.logout = function() {
                AuthService.logout().then(function() {
                    $state.go('home');
                });
            };

            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    scope.user = user;
                });
            };

            var removeUser = function() {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        },
        controller: 'LoginModalCtrl'

    };

});

app.controller('LoginModalCtrl', function($scope, $uibModal) {

    $scope.open = function() {
        $uibModal.open({
            templateUrl: '/js/common/directives/navbar/navbar.modal.template.html',
            controller: 'ModalInstanceCtrl',
            windowClass: 'login-modal'
        });
    };

});

app.controller('ModalInstanceCtrl', function($scope, $uibModalInstance) {
    $scope.ok = function() {
        $uibModalInstance.close();
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
})
