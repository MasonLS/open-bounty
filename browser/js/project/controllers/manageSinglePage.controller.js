app.controller('ManageSingleProjectCtrl', ($scope, $stateParams, ProjectFactory) => {
    ProjectFactory.findSingleProject($stateParams.projectId)
        .then(function(project) {
            $scope.userSingleProject = project;
	    $scope.projectName = $stateParams.projectName;
	    console.log(project);
        });

	    console.log('$stateParams', $stateParams);

});
