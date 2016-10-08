'use strict';

app.config($stateProvider => {
	
	$stateProvider.state('addBounty', {
		url: '/bounty/add',
		templateUrl: 'js/bounty/templates/add-bounty.html',
		params: {
			project: null
		},
	        controller: 'AddBountyCtrl',
		resolve: {
		    issues: (ProjectsFactory, $stateParams) => ProjectsFactory.getIssues($stateParams.project.name)
		}
	});

	$stateProvider.state('editBounty', {
		url: '/bounty/edit',
		templateUrl: 'js/bounty/templates/edit-bounty.html',
		params: {
			bounty: null
		},
		controller: 'EditBountyCtrl',
	});

});
