app.controller('SingleProjectCtrl', ($scope, $stateParams, bounties) => {
    $scope.bounties = bounties;
    console.log('$stateParams.project:', $stateParams.project);
    $scope.project = $stateParams.project;
});
