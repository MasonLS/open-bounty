app.controller('DonationCTRL', function($scope, $log, $window, SearchFactory) {

    $scope.allProjects = [];

    SearchFactory.getLastProjects()
        .then(function(lastProjects) {
            $scope.projects = lastProjects;
            angular.copy(lastProjects, $scope.allProjects);
        })
        .catch($log.error);

    $scope.redirectToGitHub = function(projectId) {
        SearchFactory.redirectToGitHubProject(projectId)
            .then(function(repoInfo) {
                $window.open(repoInfo.git_url, '_blank');
            })
            .catch($log.error);
    }

    $scope.clearSearch = function() {
        $scope.projects = $scope.allProjects;
        $scope.searchProjects = '';
    }
});
