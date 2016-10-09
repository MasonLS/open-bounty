'use strict';

app.config($stateProvider => {
	
	$stateProvider.state('addBounty', {
		url: '/:projectId/bounty/add',
		templateUrl: 'js/bounty/templates/add-bounty.html',
	    controller: 'AddBountyCtrl',
		resolve: {
		    project: (ProjectsFactory, $stateParams) => ProjectsFactory.getOne($stateParams.projectId)
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
