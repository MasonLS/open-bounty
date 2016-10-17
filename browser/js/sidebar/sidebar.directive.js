app.directive('sidebar', function() {
    return {
        restrict: 'E',
        templateUrl: '/js/sidebar/sidebar.html',
        scope: true,
        compile: function(tElements, tAttrs) {
            const huntLink = tElements.find('#hunt-link');
            const maintainLink = tElements.find('#maintain-link');
            const huntTab = tElements.find('#hunt-tab');
            const maintainTab = tElements.find('#maintain-tab');

            huntLink.on('click', function(e) {
                huntTab.click();
            });

            maintainLink.on('click', function(e) {
                maintainTab.click();
            });

        },
        controller: function($scope, ProjectsFactory, BountyFactory, SearchFactory) {

            $scope.getProjectsByName = SearchFactory.getProjectsByName;

            $scope.getProjectsByLanguage = SearchFactory.getProjectsByLanguage;

            $scope.show = 'profile';

            ProjectsFactory.getForUser()
                .then(userProjects => {
                    $scope.projects = userProjects;
                });

            BountyFactory.getTracked()
                .then(trackedBounties => {
                    $scope.bounties = trackedBounties;
                });
        },
        link: function(scope) {
            scope.changeToTab = function(id) {
                document.getElementById(id).click();
            }
        }
    }
});
