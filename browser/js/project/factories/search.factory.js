app.factory('SearchFactory', ($http) => {
    const SearchFactory = {};

    SearchFactory.getRepoByUser = function(userId) {
        return $http.get('/api/users/' + userId + '/github/repos/')
            .then(repos => {
                return repos.data;
            });
    };
    return SearchFactory;
});
