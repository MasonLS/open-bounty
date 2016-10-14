app.controller('NewProjectCtrl', function($scope, userRepos, ProjectsFactory, $state) {

    $scope.userRepos = userRepos;
    $scope.typeAheadDisabled = false;

    $scope.onSelect = function () {
      $scope.typeAheadDisabled = true;
    };

    $scope.clearSearch = function() {
      $scope.typeAheadDisabled = false;
      $scope.searchRepo = null;
    };

    // $scope.addProject = function() {
    //   ProjectsFactory.addProject($scope.searchRepo, $scope.submitProject.projectDescription)
    //     .then(function (project) {
    //       $state.go('singleProject', {projectId: project.id});
    //     })
    //     .catch(function (project) {
    //       $state.go('addProjectKO');
    //     })
    // };

});
