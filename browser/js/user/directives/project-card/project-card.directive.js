'use strict';

app.filter('filterTakenBounties', function () {
	return function (bounties, userBountyIds) {
		return bounties.filter(bounty => !userBountyIds.includes(bounty.id));
	}
});

app.directive('projectCard', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/user/directives/project-card/project-card.html',
        scope: {
            project: '='
        },
        controller: ($scope, $uibModal) => {
            $scope.show = 'projectInfo';
            $scope.userBountyIds = $scope.$parent.userBounties.map(bounty => bounty.id);
            $scope.bounties = $scope.project.bounties;

            $scope.$on('bounty taken', (e, bounty) => {
            	$scope.project.bounties.filter(takenBounty => takenBounty.id !== bounty.id);
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

            $scope.difficultyColor = function(difficulty) {
                if (difficulty < 3) {
                    return 'very-easy';
                } else if (difficulty < 5) {
                    return 'easy';
                } else if (difficulty < 7) {
                    return 'moderate';
                } else if (difficulty < 9) {
                    return 'hard';
                } else {
                    return 'very-hard';
                }
            }
        }
    }
});
