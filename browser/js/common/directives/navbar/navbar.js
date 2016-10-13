app.directive('navbar', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: (scope) => {

            scope.items = [
                { label: 'Donate', state: 'donate' },
                { label: 'Fund your project', state: 'fundProject' },
            ];

            // scope.privateItems = [
            //     { label: 'Manage Projects', state: 'projects', auth: true }
            // ]

            scope.user = null;

            scope.isLoggedIn = () => {
                return AuthService.isAuthenticated();
            };

            scope.logout = () => {
                AuthService.logout().then(function() {
                    $state.go('home');
                });
            };

            var setUser = () => {
                AuthService.getLoggedInUser().then(function(user) {
                    scope.user = user;
                    $rootScope.user = user;
                });
            };

            var removeUser = () => {
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

app.controller('LoginModalCtrl', ($scope, $uibModal) => {
    $scope.open = () => {
        $uibModal.open({
            templateUrl: '/js/common/directives/navbar/navbar.modal.template.html',
            controller: 'ModalInstanceCtrl',
            windowClass: 'login-modal'
        });
    };
});

app.controller('ModalInstanceCtrl', ($scope, $uibModalInstance) => {
    $scope.ok = () => {
        $uibModalInstance.close();
    };

    $scope.cancel = () => {
        $uibModalInstance.dismiss('cancel');
    };
});
