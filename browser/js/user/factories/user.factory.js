'use strict';

app.factory('UserFactory', function ($http) {
	function getData (res) {
		return res.data;
	}

	function getStarred (user) {
		return $http.get('/api/users/' + user.id + '/github/starred')
			.then(getData);
	}

	function getRepos (user) {
		return $http.get('/api/users/' + user.id + '/github/repos')
			.then(getData);
	}


	return {
		getStarred: getStarred,
		getRepos: getRepos
	}
});