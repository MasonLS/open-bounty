app.directive('searchEnter', function(SearchFactory, $log) {
    return {
        scope: {
            projects: '='
        },
        link: function(scope, element) {
            element.bind('keydown keypress', function(event) {

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
                }

            });
        }
    };
});
