app.controller('SingleProjectCtrl', ($scope, project, BountyFactory, userBounties, donationHistory) => {
    $scope.project = project;
    $scope.bounties = project.bounties;
    $scope.userBountyIds = userBounties.map(bounty => bounty.id);
    $scope.sparklineData = donationHistory;

    $scope.trackBounty = function (bountyId) {
        return BountyFactory.track(bountyId)
            .then(_ => {
            	$scope.userBountyIds.push(bountyId);
            });
    }

    $scope.showTrackButton = function (bountyId) {
    	return $scope.project.ownerId !== $scope.user.id && !$scope.userBountyIds.includes(bountyId);
    }
});
