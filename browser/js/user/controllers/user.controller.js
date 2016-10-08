'use strict';

app.controller('UserCtrl', function ($scope, UserFactory, user, starredProjects) {
	$scope.starredProjects = starredProjects;
	$scope.user = user;
});