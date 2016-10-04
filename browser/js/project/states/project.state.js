app.config(function($stateProvider) {

    $stateProvider.state('fundProject', {
        url: '/fund-your-project',
        controller: 'FundProjectCtrl',
        templateUrl: 'js/project/templates/project-fund.template.html'
    });

    $stateProvider.state('fundProjectLogged', {
        url: '/project/fund',
        controller: 'FundProjectLoggedCtrl',
        templateUrl: 'js/project/templates/project-fund-logged.template.html'
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
        }
    });

    $stateProvider.state('searchProject', {
        url: '/project/search',
        controller: 'SearchProjectCtrl',
        templateUrl: 'js/project/templates/project-search.template.html',
    });

});
