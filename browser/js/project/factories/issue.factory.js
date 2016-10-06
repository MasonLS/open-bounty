app.factory('IssueFactory', function($http, AuthService) {

    let IssueFactory = {}

    IssueFactory.getIssuesForProject = repo => {
	return AuthService.getLoggedInUser()
	    .then(user => $http.get(`/api/projects/github/issues/${repo}`))
	    .then(issues => issues.data)
	    .catch(next);
    };

     return IssueFactory;
});
