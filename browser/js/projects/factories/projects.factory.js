app.factory('ProjectsFactory', function($http, $log, AuthService) {
    function getData (res) {
        return res.data;
    }
    function getForUser() {
        return $http.get('/api/projects/')
        .then(getData)
        .catch($log.error);
    }

    function addProject (repo, description) {

        let data = {
            repoId: repo.id,
            name: repo.name,
            description: description.$modelValue
        }

        return $http.post('/api/projects', data)
            .then(getData)
            .catch($log.error);
    }

    function findProject (user) {
        return AuthService.getLoggedInUser()
            .then(function(user) {
                return $http.get('/api/projects/all/owner/' + user.id);
            })
            .then(function(project) {
                return project.data;
            })

    }

    function getOne (projectId) {
        return $http.get(`/api/projects/${projectId}`)
            .then(getData);
    }

    function searchIssues (projectId, searchTerm) {
        return $http.get(`/api/projects/${projectId}/github/issues/${searchTerm}`)
            .then(getData);
    }

    return {
        getForUser,
        findProject,
        addProject,
        getOne,
        searchIssues
    }
});
