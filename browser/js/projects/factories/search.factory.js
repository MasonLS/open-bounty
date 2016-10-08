app.factory('SearchFactory', ($http, $log) => {
    const SearchFactory = {};
    const getData = function(data) { return data.data; };

    SearchFactory.getRepoByUser = userId => {
        return $http.get('/api/users/' + userId + '/github/repos/')
            .then(getData)
            .catch($log.error);
    };

    SearchFactory.getProjectsBySearchTerm = searchTerm => {
        return $http.get('/api/public/search/' + searchTerm)
            .then(getData)
            .catch($log.error);
    };

    SearchFactory.getLastProjects = () => {
        return $http.get('/api/public/search/all')
            .then(getData)
            .catch($log.error);
    };

    SearchFactory.redirectToGitHubProject = projectId => {
        return $http.get('/api/public/repos/search/id/' + projectId)
            .then(getData)
            .catch($log.error);
    };

    return SearchFactory;
});