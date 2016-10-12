app.controller('AddBountyCtrl', ($scope, project, issues, $uibModal, ProjectsFactory, BountyFactory, $state) => {
    $scope.project = project;
    $scope.fundsAvailable = project.raised - project.fundsOnHold - project.paidOut;
    $scope.issues = issues;
    console.log('issues:', issues);
    $scope.searchIssues = function() {
        return ProjectsFactory.searchIssues(project.id, $scope.search.term)
            .then(searchedIssues => {
                $scope.issues = searchedIssues.filter(issue => {
                    return project.bounties.every(bounty => bounty.issueNumber !== issue.number)
                });
            });
    };
    const openErrorWindow = message => {
        $uibModal.open({
            template: `<h1 class="error-title">${message}</h1>`,
            windowClass: 'donation-modal'
        });
    };

    $scope.createBounty = function(bountyData) {
        if (Number(bountyData.amount) < 0 || Number(bountyData.amount) > $scope.fundsAvailable) {
            openErrorWindow('Insufficient Funds');
        } else if (isNaN(bountyData.amount)) {
            openErrorWindow('Amount must be an number.');
        } else {
            bountyData.projectId = project.id;
            return BountyFactory.createOne(bountyData)
                .then(createdBounty => $state.go('singleProject', {
                    projectId: project.id
                }));
        }
    }

});
