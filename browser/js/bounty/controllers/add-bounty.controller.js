'use strict';

app.controller('AddBountyCtrl', ($scope, project, issues, $uibModal, ProjectsFactory, BountyFactory, $state) => {

    /**
     * Finds unique values in two arrays of objects.
     * @param {array} array - The array to filter.
     * @param {string} arrayKey - The key in the array to filter.
     * @param {array} reference - The array to check against.
     * @param {string} referenceKey - The key in the array to check against.
     */
    function filterUniqueValues(array, arrayKey, reference, referenceKey) {
        return array.filter(arrayElement => !reference.some(referenceElement => arrayElement[arrayKey] === referenceElement[referenceKey]));
    }

    /**
     * Opens Error window to display a message.
     * @param {string} message - The message to display.
     * @param {string} windowType - The uibModal windowClass to use.
     */
    function openErrorWindow(message, windowType) {
        $uibModal.open({
            template: `<h1 class="error-title">${message}</h1>`,
            windowClass: windowType
        });
    }

    $scope.project = project;

    $scope.fundsAvailable = project.raised - project.fundsOnHold - project.paidOut;

    $scope.issues = filterUniqueValues(issues, 'id', project.bounties, 'issueId');

    $scope.searchIssues = () => ProjectsFactory.searchIssues(project.id, $scope.search.term)
        .then(searchedIssues => {
            searchedIssues = filterUniqueValues(searchedIssues, 'id', project.bounties, 'issueId');
            if (searchedIssues.length === 0) {
                openErrorWindow(`No issues found for <strong>${$scope.search.term}</strong>`, 'donationModal')
            } else {
                $scope.issues = filterUniqueValues(searchedIssues, 'id', project.bounties, 'issueId');
            }
        });

    $scope.createBounty = bountyData => {
        if (Number(bountyData.amount) < 0 || Number(bountyData.amount) > $scope.fundsAvailable) {
            openErrorWindow('Insufficient funds', 'donation-modal');
        } else if (isNaN(bountyData.amount)) {
            openErrorWindow('Amount must be a number.', 'donation-modal');
        } else {
            bountyData.projectId = project.id;
            return BountyFactory.createOne(bountyData)
                .then(createdBounty => $state.go('user.singleProject', {
                    projectId: project.id
                }));
        }
    }
});
