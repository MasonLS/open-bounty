'use strict';

app.controller('UserCtrl', function ($scope, starredProjects, SearchFactory) {
	$scope.projects = starredProjects;
	$scope.searchProjects = function (searchTerm) {
		return SearchFactory.getProjectsBySearchTerm(searchTerm)
			.then(projectResults => {
				$scope.projects = projectResults;
				console.log(projectResults);
			})
	};
});