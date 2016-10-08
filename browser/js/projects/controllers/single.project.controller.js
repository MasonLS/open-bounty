app.controller('SingleProjectCtrl', ($scope, $stateParams, repoIssues) => {
	$scope.repoIssues = repoIssues;
    $scope.project = $stateParams.project; 
});
