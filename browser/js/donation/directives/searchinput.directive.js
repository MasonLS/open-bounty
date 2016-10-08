app.directive('searchEnter', function(SearchFactory, $log) {
    return {
        scope: {
            projects: '=',
            allProjects: '='
        },
        link: (scope, element) => {
            element.bind('keyup', event => {
                if (event.target.value.length > 0) {
                    if (event.which === 13) {

                        let searchValue = event.target.value;

                        SearchFactory.getProjectsBySearchTerm(searchValue)
                            .then(foundProjects => {
                                scope.projects = foundProjects;
                            })
                            .catch($log.error);

                        event.preventDefault();
                    }
                } else {
                    scope.projects = scope.allProjects;
                    scope.$apply();
                }
            });
        }
    };
});
