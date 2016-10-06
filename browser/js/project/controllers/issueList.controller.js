
app.controller('IssuesCtrl', function($scope,issues, $stateParams, IssueFactory, ProjectFactory, $state) {
    // $scope.issues = [{id: 1, name: 'issueOne'}, {id:2, name: issueTwo}];
    $scope.issues = issues;
    console.table(issues);
});
