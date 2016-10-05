app.factory('SearchFactory', ($http) => {
    const SearchFactory = {};

    SearchFactory.getRepoByUser = function(userName) {
        return $http.get('/api/projects/github/repos/user/' + userName)
            .then(repos => {
                return repos.data;
            });
    };
    return SearchFactory;
});
