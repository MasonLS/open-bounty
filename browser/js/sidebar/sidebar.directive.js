app.directive('sidebar', function () {
  return {
    restrict: 'E',
    templateUrl: '/js/sidebar/sidebar.html',
    scope: true,
    controller: function ($scope, ProjectsFactory, BountyFactory) {
    	ProjectsFactory.getForUser()
    		.then(userProjects => {
    			$scope.projects = userProjects;
    		});

    	BountyFactory.getTracked()
    		.then(trackedBounties => {
    			$scope.bounties = trackedBounties;
    		});
    }
  }
});
