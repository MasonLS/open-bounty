'use strict';

app.controller('UserCtrl', function($scope, userProjects, featuredProjects, userBounties, AuthService) {
    
    AuthService.getLoggedInUser()
                .then(user => {
                    $scope.user = user;
                });

    $scope.featuredProjects = _.chunk(featuredProjects, 3);
    $scope.userProjects = userProjects;
    $scope.userBounties = userBounties;
});
