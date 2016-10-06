'use strict';

app.controller('UserCtrl', function ($scope, starredProjects) {
	console.log(starredProjects);
	if (starredProjects.length) {
		$scope.bountiesOfInterest = starredProjects.reduce((prevProj, curProj) => prevProj.bounties.concat(curProj.bounties));
	}
});