'use strict';

app.config(function($stateProvider) {

    $stateProvider.state('user', {
        url: '/user',
        controller: 'UserCtrl',
        templateUrl: 'js/user/templates/user.html',
        resolve: {
            featuredProjects: ProjectsFactory => ProjectsFactory.getFeatured().then(featured => featured),
            userProjects: ProjectsFactory => ProjectsFactory.getForUser()
        }

    });

    $stateProvider.state('user.singleProject', {
        url: '/projects/:projectId',
        templateUrl: 'js/projects/templates/single.project.html',
        resolve: {
            project: (ProjectsFactory, $stateParams) => ProjectsFactory.getOne($stateParams.projectId),
            donationHistory: (DonationFactory, $stateParams) => DonationFactory.getDonationHistory($stateParams.projectId),
            paidHistory: (DonationFactory, $stateParams) => DonationFactory.getPaidHistory($stateParams.projectId),
            userBounties: BountyFactory => BountyFactory.getTracked()
        },
        controller: 'SingleProjectCtrl',
        data: {
            authenticate: true
        }
    });

    $stateProvider.state('user.newProject', {
        url: '/new-project',
        templateUrl: 'js/projects/templates/new.project.html',
        controller: 'NewProjectCtrl',
        resolve: {
            userRepos: UserFactory => UserFactory.getRepos()
        },
        data: {
            authenticate: true
        }
    });

    $stateProvider.state('user.addBounty', {
        url: '/add-bounty/:projectId',
        templateUrl: 'js/bounty/templates/add-bounty.html',
        controller: 'AddBountyCtrl',
        resolve: {
            project: (ProjectsFactory, $stateParams) => ProjectsFactory.getOne($stateParams.projectId),
            issues: (ProjectsFactory, $stateParams) => ProjectsFactory.getIssues($stateParams.projectId)
        }
    });

    $stateProvider.state('user.editBounty', {
        url: 'projects/:projectId/:bountyId/edit',
        templateUrl: 'js/bounty/templates/edit-bounty.html',
        controller: 'EditBountyCtrl',
        resolve: {
            project: (ProjectsFactory, $stateParams) => ProjectsFactory.getOne($stateParams.projectId)
        }

    });

    // $stateProvider.state('myBounties', {
    //     url: '/:userId/bounties',
    //     templateUrl: 'js/user/templates/my-bounties.html',
    //     controller: function($scope, userBounties, user, BountyFactory) {
    //         $scope.user = user;
    //         $scope.bounties = userBounties;
    //         $scope.untrackBounty = function(bountyId) {
    //             return BountyFactory.untrack(bountyId)
    //                 .then(_ => {
    //                     for (var i = 0; i < $scope.bounties.length; i++) {
    //                         if ($scope.bounties[i].id === bountyId) {
    //                             $scope.bounties.splice(i, 1);
    //                             break;
    //                         }
    //                     }
    //                 });
    //         }
    //     },
    //     resolve: {
    //         user: AuthService => AuthService.getLoggedInUser(),
    //         userBounties: BountyFactory => BountyFactory.getTracked()
    //     }
    // });
});
