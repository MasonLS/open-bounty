app.directive('sidebar', function () {
  return {
    restrict: 'E',
    templateUrl: '/js/sidebar/sidebar.html',
    scope: true,
    compile: function (tElements, tAttrs) {
    	let huntLink = tElements.find('#hunt-link');
    	let maintainLink = tElements.find('#maintain-link');
    	let huntTab = tElements.find('#hunt-tab');
    	let maintainTab = tElements.find('#maintain-tab');

    	huntLink.on('click', function (e) {
    		huntTab.click();
    	});

    	maintainLink.on('click', function (e) {
    		maintainTab.click();
    	});

    },
    controller: function ($scope, ProjectsFactory, BountyFactory) {
    	$scope.show = 'profile';

        ProjectsFactory.getForUser()
    		.then(userProjects => {
    			$scope.projects = userProjects;
    		});

    	BountyFactory.getTracked()
    		.then(trackedBounties => {
    			$scope.bounties = trackedBounties;
    		});
    },
    link: function (scope) {
    	scope.changeToTab = function (id) {
    		document.getElementById(id).click();
    	}
    }
  }
});
