app.directive('bountyTable', () => ({
    restrict: 'E',
    templateUrl: '/js/projects/directives/bounty-table/bounty-table.html',
    scope: {
		bounties: '=',
        project: '='
    }
}));
