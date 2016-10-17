app.directive('sidebar', function () {
  return {
    restrict: 'E',
    templateUrl: '/js/sidebar/sidebar.html',
    scope: true,
    controller: function ($scope, ProjectsFactory, BountyFactory) {
    	$scope.show = 'search';
        $scope.bounties = $scope.$parent.userBounties;

        $scope.$on('bounty taken', (e, bounty) => {
            $scope.bounties.push(bounty);
        })

        $scope.$on('bounty untaken', (e, bounty) => {
            $scope.bounties = $scope.bounties.filter(userBounty => userBounty.id !== bounty.id);
        })

        $scope.$on('project added', (e, project) => {
            $scope.userProjects.push(project);
        })
    }
  }
});
