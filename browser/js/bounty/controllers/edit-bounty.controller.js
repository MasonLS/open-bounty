app.controller('EditBountyCtrl', ($scope,$state, ProjectsFactory, BountyFactory, $stateParams) => {

    $scope.changeBounty = function(bountyAmount) {
        return BountyFactory.updateBounty($stateParams.bountyId, bountyAmount)
        .then(updatedBounty => {
                 $state.go('singleProject', {projectId: $stateParams.projectId});
            });
    }



});
