'use strict';

app.directive('sidebar', () => {
    return {
        restrict: 'E',
        templateUrl: '/js/sidebar/sidebar.html',
        controller: function($scope, ProjectsFactory, BountyFactory, SearchFactory) {

    	    SearchFactory.getLanguages().then(languages => {
        		languages = languages.map(language => language['DISTINCT']);
        		$scope.languages = languages;
        	});

            $scope.show = 'search';

            $scope.$on('bounty taken', (e, bounty) => {
                $scope.userBounties.push(bounty);
            })

            $scope.$on('bounty untaken', (e, bounty) => {
                _.pull($scope.userBounties, bounty)
            })

            $scope.$on('project added', (e, project) => {
                $scope.userProjects.push(project);
            })
        }
    }
});
