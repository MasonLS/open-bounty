'use strict';

app.controller('UserCtrl', function($scope, userProjects, featuredProjects, userBounties) {
    $scope.featuredProjects = _.chunk(userProjects, 3);
    $scope.userProjects = userProjects;
    $scope.userBounties = userBounties;
});