app.controller('AddProjectCtrl', function($scope, userRepos) {
    $scope.userRepos = userRepos;

    $scope.typeAheadDisabled = false;

    $scope.onSelect = function ($item, $model, $label) {
      console.log($item);
      $scope.typeAheadDisabled = true;
    };

    $scope.clearSearch = function() {
      console.log('enabled');
      $scope.typeAheadDisabled = false;
    }

});
