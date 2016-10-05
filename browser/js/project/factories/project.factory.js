app.factory('ProjectFactory', function($http, AuthService) {

    let ProjectFactory = {}

    ProjectFactory.addProject = function(repo, description) {

        let data = {
            repoId: repo.id,
            name: repo.name,
            description: description.$modelValue
        }

        return AuthService.getLoggedInUser()
            .then(function(user) {
                data.ownerId = user.id;
                return $http.post('/api/projects/new', data);
            })
            .catch(console.log);
    };

    ProjectFactory.findProject = function(user){
        return AuthService.getLoggedInUser()
            .then(function(user){
                return $http.get('/api/projects/all/owner/' + user.id);
            })
            .then(function(project){
                return project.data;
            })

    }

    return ProjectFactory;
});
