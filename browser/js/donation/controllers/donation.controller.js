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
          $window.open(repoInfo.git_url, '_self');
        })
        .catch($log.error);
    }
});

app.controller('DonateToProjectCtrl', ($scope, $stateParams) => {
  $scope.project = $stateParams.project;
})