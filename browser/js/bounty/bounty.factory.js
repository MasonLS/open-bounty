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

	return {
		createOne,
		deleteOne,
	}
});