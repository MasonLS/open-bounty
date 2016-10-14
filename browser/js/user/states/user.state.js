'use strict';

app.config(function($stateProvider) {

    $stateProvider.state('user', {
        url: '/user',
        controller: 'UserCtrl',
        templateUrl: 'js/user/templates/user.html',
	resolve: {
            featuredProjects: ProjectsFactory => ProjectsFactory.getFeatured().then(featured => featured)
	}
    });

    $stateProvider.state('myBounties', {
        url: '/:userId/bounties',
        templateUrl: 'js/user/templates/my-bounties.html',
        controller: function($scope, userBounties, user, BountyFactory) {
            $scope.user = user;
            $scope.bounties = userBounties;
            $scope.untrackBounty = function(bountyId) {
                return BountyFactory.untrack(bountyId)
                    .then(_ => {
                        for (var i = 0; i < $scope.bounties.length; i++) {
                            if ($scope.bounties[i].id === bountyId) {
                                $scope.bounties.splice(i, 1);
                                break;
                            }
                        }
                    });
            }
        },
        resolve: {
            user: AuthService => AuthService.getLoggedInUser(),
            userBounties: BountyFactory => BountyFactory.getTracked(),
        }
    });
});
