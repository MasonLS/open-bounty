'use strict';

app.factory('UserFactory', function ($http) {
	function getData (res) {
		return res.data;
	}

	function getStarred () {
		return $http.get('/api/users/starred')
			.then(getData);
	}

	function getRepos () {
		return $http.get('/api/users/repos')
			.then(getData);
	}

	return {
		getStarred,
		getRepos
	}
});
