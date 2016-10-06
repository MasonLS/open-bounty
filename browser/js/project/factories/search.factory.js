app.factory('SearchFactory', ($http, $log) => {
    const SearchFactory = {};

    SearchFactory.getRepoByUser = function(userId) {
        return $http.get('/api/users/' + userId + '/github/repos/')
            .then(repos => {
                return repos.data;
            });
    };

    SearchFactory.getProjectsBySearchTerm = function(searchTerm) {
        return $http.get('/api/public/search/' + searchTerm)
            .then(foundProjects => {
                return foundProjects.data
            })
            .catch($log.error);
    }

    SearchFactory.getLastProjects = function() {
        return $http.get('/api/public/search/all')
            .then(allProjects => {
                return allProjects.data
            })
            .catch($log.error);
    }

    return SearchFactory;
});
