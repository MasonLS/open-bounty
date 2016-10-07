app.controller('ManageSingleProjectCtrl', ($scope, project, $stateParams, ProjectFactory) => {

    ProjectFactory.findSingleProject($stateParams.projectId)
        .then(function(project) {
            $scope.userSingleProject = project;
        });
   $scope.projectName = project.project.name 
});
