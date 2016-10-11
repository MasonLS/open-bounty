app.controller('EditBountyCtrl', ($scope, $state, project, ProjectsFactory, BountyFactory, $stateParams) => {
    $scope.project = project;
    $scope.bountyId = +$stateParams.bountyId
    $scope.bountyAmount = project.bounties.filter(bounty => bounty.id === +$stateParams.bountyId)[0].amount;
    $scope.issue = project.bounties.filter(bounty => bounty.id === +$stateParams.bountyId)[0].issue;
    $scope.changeBounty = (bountyId, amount) => BountyFactory.updateBounty(bountyId, amount)
        .then(updatedBounty => $state.go('singleProject', {
            projectId: $stateParams.projectId
        }));

    $scope.deleteBounty = bountyId => BountyFactory.deleteOne(bountyId)
	.then(() => $state.go('singleProject', {
	    projectId: $stateParams.projectId
	}));
});
