app.factory('BountyFactory', $http => ({
    getAll() {
        return $http.get('api/bounties/1')
        .then(response => response.data)
    }
}))
