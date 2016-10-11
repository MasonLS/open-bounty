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

    function track(bountyId) {
        return $http.get(`/api/bounties/${bountyId}/track`);
    }

    function untrack(bountyId) {
        return $http.get(`/api/bounties/${bountyId}/untrack`);
    }

    function getTracked() {
        return $http.get('api/bounties/tracked')
            .then(getData);
    }

    function updateBounty(bountyId, bountyAmount) {
        let data = {
            amount: bountyAmount
        }
        return $http.put(`/api/bounties/${bountyId}`, data)
            .then(getData)
    }
    return {
        createOne,
        deleteOne,
        track,
        untrack,
        getTracked,
        updateBounty
    }
});
