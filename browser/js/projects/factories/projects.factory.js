app.factory('ProjectsFactory', function($http, $log, AuthService) {
    function getData (res) {
        return res.data;
    }
    function getForUser() {
        return $http.get('/api/projects/')
        .then(getData)
        .catch($log.error);
    }
    function getIssues (projectName) {
        return $http.get('/api/projects/' + projectName + '/issues')
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

    function findSingleProject (projectId) {
        return $http.get('/api/bounties/' + projectId)
            .then(function(project) {
                return project.data;
            })
    }

    const findOneById = projectId => $http.get(`/api/projects/one/${projectId}`)
	    .then(project => project.data);

    // return ProjectsFactory;
    return {
        getForUser,
        getIssues,
        findOneById,
        findProject,
        addProject,
        findSingleProject
    }
});
