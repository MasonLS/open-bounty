'use strict';

app.controller('UserCtrl', function ($scope, starredRepos) {
	$scope.starredRepos = starredRepos;
});