app.controller('DonationCTRL', function($scope, $log, $window, $uibModal, $timeout, SearchFactory, DonationFactory) {

    $scope.allProjects = [];

    SearchFactory.getLastProjects()
        .then(lastProjects => {
            $scope.projects = lastProjects;
            angular.copy(lastProjects, $scope.allProjects);
        })
        .catch($log.error);

    $scope.redirectToGitHub = projectId => {
        SearchFactory.redirectToGitHubProject(projectId)
            .then(repoInfo => {
                $window.open(repoInfo.html_url, '_blank');
            })
            .catch($log.error);
    }

    $scope.clearSearch = () => {
        $scope.projects = $scope.allProjects;
        $scope.searchProjects = '';
    }

    $scope.openDonationWindow = (project) => {

        $uibModal.open({
            templateUrl: '/js/donation/templates/donation.modal.template.html',
            controller: 'DonationModalInstanceCtrl',
            windowClass: 'donation-modal',
            resolve: {
                items: () => {
                    return {
                        project: project
                    }
                }
            }
        });
    };

});


app.controller('DonationModalInstanceCtrl', ($scope, $uibModalInstance, $log, $window, items, DonationFactory) => {

    $scope.items = items;
    $scope.form = {};

    $scope.completeDonation = () => {
        if ($scope.form.donationForm.$valid) {
          DonationFactory.requestPayPalToken($scope.items.project, $scope.form.donationForm)
            .then((token) => {
              $window.location.href = token.transaction.approvalUrl;
            })
            .catch($log.error);
        }
    };

    $scope.ok = () => {
        $uibModalInstance.close();
    };

    $scope.cancel = () => {
        $uibModalInstance.dismiss('cancel');
    };
})
