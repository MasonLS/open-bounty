'use strict';

app.factory('BountyFactory', function($http) {

    function getData(res) {
        return res.data;
    }

    function createOne(bountyData) {
        return $http.post('/api/bounties/', bountyData)
            .then(getData);
    }

    function deleteOne(bountyId) {
        return $http.delete(`/api/bounties/${bountyId}`);
    }

    function updateBounty(bountyId, bountyData) {
        const data = {
            amount: bountyData.amount,
	    previousAmount: bountyData.previousAmount,
	    projectId: bountyData.projectId
        }
        return $http.put(`/api/bounties/${bountyId}`, data)
            .then(getData)
    }

    return {
        createOne,
        deleteOne,
        updateBounty,
    }
});
