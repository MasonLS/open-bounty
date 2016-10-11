app.controller('EditBountyCtrl', ($scope, $state, project, ProjectsFactory, BountyFactory, $stateParams) => {
    $scope.project = project;
    $scope.issue = project.bounties.filter(bounty => bounty.id === +$stateParams.bountyId)[0].issue;
    $scope.changeBounty = (bountyAmount) => BountyFactory.updateBounty($stateParams.bountyId, bountyAmount)
        .then(updatedBounty => $state.go('singleProject', {projectId: $stateParams.projectId}))
});
