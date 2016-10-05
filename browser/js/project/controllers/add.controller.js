app.controller('AddProjectCtrl', function($scope, userRepos, ProjectFactory, $state) {

    $scope.userRepos = userRepos;
    $scope.typeAheadDisabled = false;

    $scope.onSelect = function () {
      $scope.typeAheadDisabled = true;
    };

    $scope.clearSearch = function() {
      $scope.typeAheadDisabled = false;
      $scope.searchRepo = null;
    };

    $scope.addProject = function() {
      ProjectFactory.addProject($scope.searchRepo, $scope.submitProject.projectDescription)
        .then(function () {
          $state.go('addProjectOK');
        })
        .catch(function () {
          $state.go('addProjectKO');
        })
    };

});
