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


    $stateProvider.state('addProject', {
        url: '/project/add',
        controller: 'AddProjectCtrl',
        templateUrl: 'js/project/templates/project-add.template.html',
        data: {
            authenticate: true
        },
        resolve: {
            userRepos: function(SearchFactory, AuthService) {
                return AuthService.getLoggedInUser()
                    .then(function(user) {
                        return user;
                    })
                    .then(function(user) {
                        return SearchFactory.getRepoByUser(user.id)
                            .then(function(repos) {
                                return repos;
                            });
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

});
