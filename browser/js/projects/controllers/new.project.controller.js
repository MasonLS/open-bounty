'use strict';

app.controller('NewProjectCtrl', ($scope, $log, $state, userRepos, ProjectsFactory) => {

    $scope.userRepos = userRepos;
    $scope.typeAheadDisabled = false;

    $scope.onSelect = () => {
        $scope.typeAheadDisabled = true;
    };

    $scope.clearSearch = () => {
        $scope.typeAheadDisabled = false;
        $scope.searchRepo = null;
    };

    $scope.addProject = () => {
        ProjectsFactory.addProject($scope.searchRepo, $scope.submitProject.projectDescription)
            .then(project => {
                $scope.$parent.userProjects.push(project);
                $state.go('user.singleProject', { projectId: project.id });
            })
            .catch((error) => {
                $log.error(error);
                $state.go('addProjectKO');
            });
    };

});
