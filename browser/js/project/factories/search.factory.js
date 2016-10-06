app.factory('SearchFactory', ($http, $log) => {
    const SearchFactory = {};
    const getData = function(data) { return data.data; };

    SearchFactory.getRepoByUser = function(userId) {
        return $http.get('/api/users/' + userId + '/github/repos/')
            .then(getData);
    };

    SearchFactory.getProjectsBySearchTerm = function(searchTerm) {
        return $http.get('/api/public/search/' + searchTerm)
            .then(getData)
            .catch($log.error);
    }

    SearchFactory.getLastProjects = function() {
        return $http.get('/api/public/search/all')
            .then(getData)
            .catch($log.error);
    }

    SearchFactory.redirectToGitHubProject = function(projectId) {
        return $http.get('/api/public/repos/search/id/' + projectId)
            .then(getData)
            .catch($log.error)
    }

    return SearchFactory;
});
