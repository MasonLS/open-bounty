app.controller('AddBountyCtrl', ($scope, issues, $stateParams) => {
    console.log('$stateParams.project:', $stateParams.project);
    console.log('AddBountyCtrl issues:', issues)
    $scope.issues = issues;
    $scope.project = $stateParams.project;
});
