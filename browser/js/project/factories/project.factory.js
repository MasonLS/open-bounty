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
                data.OwnerId = user.id;
                return $http.post('/api/projects/new', data);
            })
            .catch(console.log);
    };

    return ProjectFactory;
});
