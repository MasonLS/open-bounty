app.config(function($stateProvider) {

    $stateProvider.state('fundProject', {
        url: '/fund-your-project',
        controller: 'FundProjectCtrl',
        templateUrl: 'js/projects/templates/project-fund.template.html'
    });

    $stateProvider.state('fundProjectLogged', {
        url: '/project/fund',
        controller: 'FundProjectLoggedCtrl',
        templateUrl: 'js/projects/templates/project-fund-logged.template.html',
        data: {
            authenticate: true
        },
    });

    $stateProvider.state('manageProjects', {
        url: '/project/manage',
        controller: 'ManageProjectCtrl',
        templateUrl: 'js/projects/templates/project-manage.template.html',
        data: {
            authenticate: true
        }
    });

    $stateProvider.state('manageSingleProjects', {
        url: '/project/manage/:projectId',
        controller: 'ManageSingleProjectCtrl',
        templateUrl: 'js/projects/templates/project-manageSingleProject.template.html',
        resolve: {
            project: ($stateParams, ProjectFactory) => ProjectFactory.findOneById($stateParams.projectId)
                .then(project => project)
        },
        data: {
            authenticate: true
        }
    });


    $stateProvider.state('addProject', {
        url: '/project/add',
        controller: 'AddProjectCtrl',
        templateUrl: 'js/projects/templates/project-add.template.html',
        data: {
            authenticate: true
        },
        resolve: {
            userRepos: function(UserFactory, AuthService) {
                return AuthService.getLoggedInUser()
                    .then(function(user) {
                        return UserFactory.getRepos(user)
                    });
            }
        }
    });

    $stateProvider.state('addProjectOK', {
        url: '/project/add/ok',
        templateUrl: 'js/projects/templates/project-add-ok.template.html',
        data: {
            authenticate: true
        }
    });

    $stateProvider.state('addProjectKO', {
        url: '/project/add/ko',
        templateUrl: 'js/projects/templates/project-add-ko.template.html',
        data: {
            authenticate: true
        }
    });

    $stateProvider.state('searchProject', {
        url: '/project/search',
        controller: 'SearchProjectCtrl',
        templateUrl: 'js/projects/templates/project-search.template.html',
    });


    $stateProvider.state('issueList', {
        url: '/project/issue-list/:repo',
        controller: 'IssuesCtrl',
        templateUrl: 'js/projects/templates/project-issue-list.template.html',
        resolve: {
            issues: ($stateParams, IssueFactory, AuthService) => AuthService.getLoggedInUser()
                .then(user => IssueFactory.getIssuesForProject($stateParams.repo)
                    .then(issues => issues))
        }
    });

    $stateProvider.state('addBounty', {
        url: '/project/issue-list/add-bounty',
        controller: 'BountyCtrl',
        templateUrl: 'js/projects/templates/project-add-bounty.template.html'
    });

});
