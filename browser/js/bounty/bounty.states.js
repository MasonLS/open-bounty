'use strict';

app.config($stateProvider => {

	$stateProvider.state('addBounty', {
		url: '/add-bounty/:projectId',
		templateUrl: 'js/bounty/templates/add-bounty.html',
	    controller: 'AddBountyCtrl',
		resolve: {
		    project: (ProjectsFactory, $stateParams) => ProjectsFactory.getOne($stateParams.projectId)
		}
	});

	$stateProvider.state('editBounty', {
		url: '/:projectId/edit-bounty/:bountyId',
		templateUrl: 'js/bounty/templates/edit-bounty.html',
		controller: 'EditBountyCtrl',

	});

});
