'use strict';

app.config($stateProvider => {

    $stateProvider.state('projects', {
        url: '/projects',
        templateUrl: 'js/projects/templates/projects.html',
        controller: 'ProjectsCtrl',
        resolve: {
            projects: function (ProjectsFactory) {
                return ProjectsFactory.getForUser();
            }
        }
    });

    $stateProvider.state('newProject', {
        url: '/projects/new',
        templateUrl: 'js/projects/templates/new.project.html',
        controller: 'NewProjectCtrl',
        resolve: {
            userRepos: UserFactory => UserFactory.getRepos()
        }
    })

    $stateProvider.state('singleProject', {
        url: '/projects/single',
        templateUrl: 'js/projects/templates/single.project.html',
        params: {
            project: null
        },
        resolve: {
            bounties: (ProjectsFactory, $stateParams) => ProjectsFactory.getIssues($stateParams.project.name)
        },
        controller: 'SingleProjectCtrl'
    });

});
