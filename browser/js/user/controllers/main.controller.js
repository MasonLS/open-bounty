'use strict';

app.controller('UserCtrl', function ($scope, starredProjects) {
	// $scope.starredProjects = starredProjects;
	// var projectsOfInterest = starredProjects.reduce((prevProj, curProj) => prevProj.concat(curProj), []);
	console.log(starredProjects);
	$scope.bountiesOfInterest = starredProjects.reduce((prevProj, curProj) => prevProj.bounties.concat(curProj.bounties), []);
});