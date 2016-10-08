'use strict';

app.factory('UserFactory', function ($http) {
	function getData (res) {
		return res.data;
	}

	function getStarred (user) {
		return $http.get('/api/users/' + user.id + '/github/starred')
			.then(getData);
	}

	function getRepos () {
		return $http.get('/api/users/repos')
			.then(getData);
	}


	return {
		getStarred,
		getRepos,
		getReposOfInterest
	}
});
