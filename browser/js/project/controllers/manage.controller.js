app.controller('ManageProjectCtrl', ($scope, $stateParams,AuthService, ProjectFactory, BountyFactory) => {

    //It's used to get the Projects
    AuthService.getLoggedInUser()
        .then(user => user)
        .then(user => ProjectFactory.findProject(user.id))
        .then(project => {
            $scope.userProjects = project;
        });



});
