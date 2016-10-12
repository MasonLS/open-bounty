app.controller('SingleProjectCtrl', ($scope, donationHistory, project) => {
    $scope.project = project;
    $scope.sparklineData = donationHistory;
});
