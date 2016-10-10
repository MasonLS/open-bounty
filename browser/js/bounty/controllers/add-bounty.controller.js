app.controller('AddBountyCtrl', ($scope, project, $uibModal, ProjectsFactory, BountyFactory, $state) => {
    $scope.project = project;

    $scope.fundsAvailable = project.raised;

    $scope.searchIssues = function() {
        return ProjectsFactory.searchIssues(project.id, $scope.search.term)
            .then(searchedIssues => {
                $scope.issues = searchedIssues.filter(issue => {
                    return project.bounties.every(bounty => bounty.issueNumber !== issue.number)
                });
            });
    };
    const openErrorWindow = () => {
        $uibModal.open({
            templateUrl: 'js/bounty/templates/insufficient-funds.html',
            windowClass: 'donation-modal'
        });
    };

    $scope.createBounty = function(bountyData) {
        if (Number(bountyData.amount) < 0 || Number(bountyData.amount) > $scope.fundsAvailable) {
            openErrorWindow();
        } else {
            bountyData.projectId = project.id;
            return BountyFactory.createOne(bountyData)
                .then(createdBounty => $state.go('singleProject', {
                    projectId: project.id
                }));
        }
    }

});
