app.controller('EditBountyCtrl', ($scope, $state, project, ProjectsFactory, BountyFactory, $stateParams, $uibModal) => {
    $scope.project = project[0];
    $scope.bountyId = +$stateParams.bountyId;
    $scope.fundsAvailable = project.raised - project.fundsOnHold - project.paidOut;
    $scope.bountyAmount = project[0].bounties.filter(bounty => bounty.id === +$stateParams.bountyId)[0].amount;
    $scope.issue = project[0].bounties.filter(bounty => bounty.id === +$stateParams.bountyId)[0].issue;

    const openErrorWindow = message => {
        $uibModal.open({
            template: `<h1 class="error-title">${message}</h1>`,
            windowClass: 'donation-modal'
        });
    };

    $scope.changeBounty = (bountyId, amount) => {
        if (amount > $scope.fundsAvailable) {
            openErrorWindow("Insufficient Funds");
        } else if (!amount.match(/d+/g) || amount <= 0) {
            openErrorWindow("Amount must be a number > 0")
        } else {
            BountyFactory.updateBounty(bountyId, amount)
                .then(updatedBounty => $state.go('singleProject', {
                    projectId: project[0].id
                }));
        }
    };

    $scope.deleteBounty = bountyId => BountyFactory.deleteOne(bountyId)
        .then(() => $state.go('singleProject', {
            projectId: $stateParams.projectId
        }));

});
