app.directive('sidebar', function () {
  return {
    restrict: 'E',
    templateUrl: '/js/sidebar/sidebar.html',
    // scope: true,
    controller: function ($scope, ProjectsFactory, BountyFactory) {
    	$scope.show = 'search';

        $scope.$on('bounty taken', (e, bounty) => {
            $scope.userBounties.push(bounty);
        })

        $scope.$on('bounty untaken', (e, bounty) => {
            _.pull($scope.userBounties, bounty)
        })

        $scope.$on('project added', (e, project) => {
            $scope.userProjects.push(project);
        })
    }
  }
});
