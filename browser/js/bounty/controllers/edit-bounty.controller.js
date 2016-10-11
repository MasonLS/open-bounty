app.controller('EditBountyCtrl', ($scope, $state, project, ProjectsFactory, BountyFactory, $stateParams) => {
    $scope.project = project;
    $scope.bountyAmount = project.bounties.filter(bounty => bounty.id === + $stateParams.bountyId)[0].amount;
    console.log('bountyAmount:',$scope.bountyAmount)
	       
    $scope.issue = project.bounties.filter(bounty => bounty.id === +$stateParams.bountyId)[0].issue;
    $scope.changeBounty = (bountyData) => BountyFactory.updateBounty($stateParams.bountyId, bountyData)
        .then(updatedBounty => $state.go('singleProject', {projectId: $stateParams.projectId}))
});
