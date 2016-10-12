'use strict';

app.config($stateProvider => {

    $stateProvider.state('projects', {
        url: '/projects',
        templateUrl: 'js/projects/templates/projects.html',
        controller: 'ProjectsCtrl',
        resolve: {
            projects: function(ProjectsFactory) {
                return ProjectsFactory.getForUser();
            }
        },
        data: {
            authenticate: true
        }
    });

    $stateProvider.state('newProject', {
        url: '/projects/new',
        templateUrl: 'js/projects/templates/new.project.html',
        controller: 'NewProjectCtrl',
        resolve: {
            userRepos: UserFactory => UserFactory.getRepos()
        },
        data: {
            authenticate: true
        }
    })

    $stateProvider.state('singleProject', {
        url: '/projects/:projectId',
        templateUrl: 'js/projects/templates/single.project.html',
        resolve: {
            project: (ProjectsFactory, $stateParams) => ProjectsFactory.getOne($stateParams.projectId),
            donationHistory: (DonationFactory, $stateParams) => DonationFactory.getDonationHistory($stateParams.projectId)
        },
        controller: 'SingleProjectCtrl',
        data: {
            authenticate: true
        }
    });
});
