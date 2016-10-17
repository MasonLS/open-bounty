'use strict';

app.directive('bountyPost', function () {
	return {
		restrict: 'E',
		templateUrl: 'js/user/directives/bounty-post/bounty-post.html',
		controller: ($rootScope, $scope, BountyFactory) => {
			if ($scope.$parent.userBountyIds) {
				$scope.taken = $scope.$parent.userBountyIds.includes($scope.bounty.id);
			} else {
				$scope.taken = true;
			}

			$scope.takeBounty = bounty => {
				$rootScope.$broadcast('bounty taken', bounty);
				$scope.$emit('bounty taken', bounty);
				return BountyFactory.track(bounty.id);
			}

			$scope.untakeBounty = bounty => {
				$rootScope.$broadcast('bounty untaken', bounty);
				return BountyFactory.untrack(bounty.id);
			}
		}
	}
});