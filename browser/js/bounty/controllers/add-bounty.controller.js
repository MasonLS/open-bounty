app.controller('AddBountyCtrl', ($scope, project, issues, $uibModal, ProjectsFactory, BountyFactory, $state) => {
    $scope.project = project;
    $scope.fundsAvailable = project.raised - project.fundsOnHold - project.paidOut;
    $scope.issues = issues;

    $scope.searchIssues = () => ProjectsFactory.searchIssues(project.id, $scope.search.term)
        .then(searchedIssues => {
            $scope.issues = searchedIssues.filter(issue => {
                return project.bounties.every(bounty => bounty.issueNumber !== issue.number)
            });
        });

    const openErrorWindow = message => $uibModal.open({
        template: `<h1 class='error-title'>${message}</h1>`,
        windowClass: 'donation-modal'
    });

    $scope.createBounty = function(bountyData) {
        if (Number(bountyData.amount) < 0 || Number(bountyData.amount) > $scope.fundsAvailable) {
            openErrorWindow('Insufficient funds');
        } else if (isNaN(bountyData.amount)) {
            openErrorWindow('Amount must be a number.');
        } else {
            bountyData.projectId = project.id;
            return BountyFactory.createOne(bountyData)
                .then(() => $state.go('singleProject', {
                    projectId: project.id
                }));
        }
    }
});
