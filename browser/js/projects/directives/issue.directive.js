app.directive('issueTable', () => ({
    restrict: 'E',
    templateUrl: '/js/projects/templates/issue-table.html',
    scope: {
	issues: '='
    }
}));
