app.controller('ManageProjectCtrl', ($scope, $stateParams,AuthService, ProjectFactory, BountyFactory) => {

    //It's used to get the Projects
    AuthService.getLoggedInUser()
        .then(user => user)
        .then(user => ProjectsFactory.getByUser(user.id))
        .then(project => {
            $scope.userProjects = project;
        });



});
