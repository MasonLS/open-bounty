app.config(function($stateProvider) {

    $stateProvider.state('fundProject', {
        url: '/fund-your-project',
        controller: 'FundProjectCtrl',
        templateUrl: 'js/project/templates/project-fund.template.html'
    });

    $stateProvider.state('fundProjectLogged', {
        url: '/project/fund',
        controller: 'FundProjectLoggedCtrl',
        templateUrl: 'js/project/templates/project-fund-logged.template.html',
        data: {
            authenticate: true
        },
    });

    $stateProvider.state('manageProjects', {
        url: '/project/manage',
        controller: 'ManageProjectCtrl',
        templateUrl: 'js/project/templates/project-manage.template.html',
        data: {
            authenticate: true
        }
    });

    $stateProvider.state('manageSingleProjects', {
        url: '/project/manage/:projectId',
        controller: 'ManageSingleProjectCtrl',
        templateUrl: 'js/project/templates/project-manageSingleProject.template.html',
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
        templateUrl: 'js/project/templates/project-add.template.html',
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
        templateUrl: 'js/project/templates/project-add-ok.template.html',
        data: {
            authenticate: true
        }
    });

    $stateProvider.state('addProjectKO', {
        url: '/project/add/ko',
        templateUrl: 'js/project/templates/project-add-ko.template.html',
        data: {
            authenticate: true
        }
    });

    $stateProvider.state('searchProject', {
        url: '/project/search',
        controller: 'SearchProjectCtrl',
        templateUrl: 'js/project/templates/project-search.template.html',
    });


    $stateProvider.state('issueList', {
        url: '/project/issue-list/:repo',
        controller: 'IssuesCtrl',
        templateUrl: 'js/project/templates/project-issue-list.template.html',
        resolve: {
            issues: ($stateParams, IssueFactory, AuthService) => AuthService.getLoggedInUser()
                .then(user => IssueFactory.getIssuesForProject($stateParams.repo)
                    .then(issues => issues))
        }
    });

    $stateProvider.state('addBounty', {
        url: '/project/issue-list/add-bounty',
        controller: 'BountyCtrl',
        templateUrl: 'js/project/templates/project-add-bounty.template.html'
    });

});
