'use strict';

app.config($stateProvider => {

    $stateProvider.state('user', {
        url: '/user',
        controller: 'UserCtrl',
        templateUrl: 'js/user/templates/user.html',
        resolve: {
            featuredProjects: ProjectsFactory => ProjectsFactory.getFeatured(),
            userProjects: ProjectsFactory => ProjectsFactory.getForUser(),
            userBounties: BountyFactory => BountyFactory.getTracked()
        }

    });

    $stateProvider.state('user.singleProject', {
        url: '/projects/:projectId',
        templateUrl: 'js/projects/templates/single.project.html',
        resolve: {
            project: (ProjectsFactory, $stateParams) => ProjectsFactory.getOne($stateParams.projectId),
            donationHistory: (DonationFactory, $stateParams) => DonationFactory.getDonationHistory($stateParams.projectId),
            paidHistory: (DonationFactory, $stateParams) => DonationFactory.getPaidHistory($stateParams.projectId),
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

    $stateProvider.state('user.searchProjects', {
        url: '/search/:searchTerm',
        templateUrl: 'js/user/templates/search.html',
        controller: function($scope, projectResults) {
            $scope.projects = _.chunk(projectResults, 3);
        },
        resolve: {
            projectResults: (ProjectsFactory, $stateParams) => ProjectsFactory.searchProjects($stateParams.searchTerm)
        }
    });

    $stateProvider.state('user.searchProjectsByLanguage', {
        url: '/language/:searchTerm',
        templateUrl: 'js/user/templates/search.html',
        controller: function ($scope, projectResults) {
            $scope.projects = _.chunk(projectResults, 3);
        },
        resolve: {
            projectResults: (SearchFactory, $stateParams) => SearchFactory.getProjectsByLanguage($stateParams.searchTerm)
        }
    });

});
