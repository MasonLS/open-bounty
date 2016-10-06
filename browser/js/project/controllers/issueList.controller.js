
app.controller('IssuesCtrl', function($scope, IssueFactory, ProjectFactory, $state) {
    $scope.issues = [{id: 1, name: 'issueOne'}, {id:2, name: 'issueTwo'}];
    console.log('IssuesCtrl loaded');
});

