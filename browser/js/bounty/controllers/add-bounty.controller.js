app.controller('AddBountyCtrl', ($scope, project, ProjectsFactory, BountyFactory, $state) => {
    $scope.project = project;

    $scope.searchIssues = function () {
    	return ProjectsFactory.searchIssues(project.id, $scope.search.term)
    		.then(searchResultObj => {
    			$scope.issues = searchResultObj.items;
    		});
    }

    $scope.createBounty = function (bountyData) {
    	bountyData.projectId = project.id;
    	
    	return BountyFactory.createOne(bountyData)
    		.then(createdBounty => {
    			$state.go('singleProject', {projectId: project.id});
    		});
    }
});
