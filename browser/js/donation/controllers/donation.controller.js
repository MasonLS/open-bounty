app.controller('DonationCTRL', function($scope, $log, $window, SearchFactory) {
    SearchFactory.getLastProjects()
        .then(function(lastProjects) {
            $scope.projects = lastProjects;
        })
        .catch($log.error);

    $scope.redirectToGitHub = function(projectId) {
      SearchFactory.redirectToGitHubProject(projectId)
        .then(function(repoInfo){
          console.log(repoInfo);
          $window.open(repoInfo.git_url, "_blank");
        })
        .catch($log.error);
    }
});
