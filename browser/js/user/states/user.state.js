'use strict';

app.config(function ($stateProvider) {
	
	$stateProvider.state('user', {
		url: '/user',
		controller: 'UserCtrl',
		templateUrl: 'js/user/templates/user.html',
		resolve: {
			user: AuthService => AuthService.getLoggedInUser(),
			userBounties: BountyFactory => BountyFactory.getTracked(),
			starredProjects: UserFactory => UserFactory.getStarred()
		}
	});
});