app.controller('SingleProjectCtrl', ($scope, project, BountyFactory, donationHistory, paidHistory, ChartFactory) => {
    $scope.project = project;
    $scope.bounties = project.bounties;
    $scope.userBountyIds = $scope.userBounties.map(bounty => bounty.id);
    $scope.chartConfig = ChartFactory.chartConfig;
    $scope.chartConfig.series[0].data = donationHistory;
    $scope.chartConfig.series[1].data = paidHistory;

    $scope.trackBounty = function(bountyId) {
        return BountyFactory.track(bountyId)
            .then(() => {
                $scope.userBountyIds.push(bountyId);
            });
    }

    $scope.showTrackButton = function(bountyId) {
        return $scope.project.ownerId !== $scope.user.id && !$scope.userBountyIds.includes(bountyId);
    }
});
