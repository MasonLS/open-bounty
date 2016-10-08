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

    $stateProvider.state('projects.new', {
        url: '/new',
        templateUrl: 'js/projects/templates/projects.new.html',
        controller: 'ProjectsNewCtrl',
        resolve: {
            userRepos: UserFactory => UserFactory.getRepos()
        }
    })

    $stateProvider.state('projects.single', {
        url: '/single',
        templateUrl: 'js/projects/templates/projects.single.html',
        params: {
            project: null
        },
        resolve: {
            repoIssues: (ProjectsFactory, $stateParams) => ProjectsFactory.getIssues($stateParams.project.id)
        },
        controller: 'ProjectsSingleCtrl'
    });

})
