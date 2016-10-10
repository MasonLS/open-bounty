'use strict';

app.factory('BountyFactory', function ($http) {
	
	function getData (res) {
		return res.data;
	}

	function createOne (bountyData) {
		return $http.post('/api/bounties/', bountyData)
			.then(getData);
	}

	function deleteOne (bountyId) {
		return $http.delete(`/api/bounties/${bountyId}`);
	}

	function track (bountyId) {
		return $http.get(`/api/bounties/${bountyId}/track`);
	}

	function getTracked () {
		return $http.get('api/bounties/tracked')
			.then(getData);
	}

	return {
		createOne,
		deleteOne,
		track,
		getTracked
	}
});