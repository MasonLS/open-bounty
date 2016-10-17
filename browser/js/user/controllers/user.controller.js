'use strict';

app.controller('UserCtrl', function($scope, userProjects, featuredProjects, userBounties) {
    $scope.featuredProjects = _.chunk(featuredProjects, 3);
    $scope.userProjects = userProjects;
    $scope.userBounties = userBounties;
});