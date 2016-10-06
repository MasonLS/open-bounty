app.controller('DonationCTRL', function($scope, SearchFactory) {
    SearchFactory.getLastProjects()
        .then(function(lastProjects) {
            $scope.projects = lastProjects;
        });
});
