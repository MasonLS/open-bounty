'use strict';

app.controller('UserCtrl', function ($scope, starredProjects) {
	$scope.starredProjects = starredProjects;
	$scope.projectsOfInterest = starredProjects.reduce((prevProj, curProj) => prevProj.concat(curProj), []);
});