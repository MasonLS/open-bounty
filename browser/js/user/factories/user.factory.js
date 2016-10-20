'use strict';

app.factory('UserFactory', ($http, $log) => {
    function getData(res) {
        return res.data;
    }

    function getStarred() {
        return $http.get('/api/users/starred')
            .then(getData)
            .catch($log.error);

    }

    function getRepos() {
        return $http.get('/api/users/github/repos')
            .then(getData)
            .catch($log.error);
    }

    return {
        getStarred,
        getRepos
    }
});
