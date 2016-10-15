'use strict';

app.directive('projectCard', function () {
	return {
		restrict: 'E',
		templateUrl: 'js/user/directives/project-card/project-card.html',
		scope: {
			project: '='
		},
		controller: ($scope) => {
			$scope.show = 'projectInfo'

			$scope.difficultyColor = function (difficulty) {
				if (difficulty < 3) {
					return 'very-easy';
				} else if (difficulty < 5) {
					return 'easy';
				} else if (difficulty < 7) {
					return 'moderate';
				} else if (difficulty < 9) {
					return 'hard';
				} else {
					return 'very-hard';
				}
			}
		}
	}
});