app.controller('EditBountyCtrl', ($scope, $state, project, ProjectsFactory, BountyFactory, $stateParams) => {
    $scope.project = project[0];
    $scope.bountyId = +$stateParams.bountyId
    $scope.bountyAmount = project[0].bounties.filter(bounty => bounty.id === +$stateParams.bountyId)[0].amount;
    $scope.issue = project[0].bounties.filter(bounty => bounty.id === +$stateParams.bountyId)[0].issue;
    $scope.changeBounty = (bountyId, amount) => BountyFactory.updateBounty(bountyId, amount)
        .then(updatedBounty => $state.go('singleProject', {
            projectId: project[0].id
        }));

    $scope.deleteBounty = bountyId => BountyFactory.deleteOne(bountyId)
	.then(() => $state.go('singleProject', {
	    projectId: $stateParams.projectId
	}));
});
