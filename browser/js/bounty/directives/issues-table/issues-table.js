'use strict';

app.directive('issuesTable', function () {
	return {
		restrict: 'E',
		templateUrl: '/js/bounty/directives/issues-table/issues-table.html',
		// scope: false
		// scope: {
		// 	project: '='
		// },
		// controller: function ($scope, BountyFactory) {
		// 	$scope.createBounty = function (bountyData) {
		// 		bountyData.projectId = $scope.projectId;
		// 		return BountyFactory.createOne(bountyData);
		// 	}
		// }
	}
})