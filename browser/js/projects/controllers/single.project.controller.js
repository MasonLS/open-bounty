app.controller('SingleProjectCtrl', ($scope, $stateParams, bounties) => {
    $scope.bounties = bounties;
    $scope.project = $stateParams.project;
});
