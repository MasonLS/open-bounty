'use strict';

app.filter('filterTakenBounties', () => {
    return (bounties, userBountyIds) => {
        return bounties.filter(bounty => !userBountyIds.includes(bounty.id));
    }
});

app.directive('projectCard', () => {
    return {
        restrict: 'E',
        templateUrl: 'js/user/directives/project-card/project-card.html',
        controller: ($scope, $uibModal) => {
            $scope.show = 'projectInfo';
            $scope.userBountyIds = $scope.$parent.userBounties.map(bounty => bounty.id);

            $scope.$on('bounty taken', (e, bounty) => {
                _.pull($scope.project.bounties, bounty);
            });

            $scope.$on('bounty untaken', (e, bounty) => {
                if (bounty.projectId === $scope.project.id) {
                    $scope.project.bounties.push(bounty);
                }
            });

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

        }
    }
});
