'use strict';

app.config(function ($stateProvider) {
	
	$stateProvider.state('user', {
		url: '/user',
		controller: 'UserCtrl',
		templateUrl: 'js/user/templates/user.html',
		resolve: {
			starredProjects: function (UserFactory, $rootScope, AuthService) {
				if (!$rootScope.loggedInUser) {
					return AuthService.getLoggedInUser()
						.then(user => {
							$rootScope.loggedInUser = user;
							return UserFactory.getStarred(user);
						});
				}
				return UserFactory.getStarred($rootScope.loggedInUser);
			}
		}
	});
});