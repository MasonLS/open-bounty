'use strict';

app.controller('ProjectsCtrl', ($scope, projects) => {
    $scope.projects = projects;
    $scope.pullRequestMerged = function(project) {
        return project.bounties.some(bounty => bounty.status === 'pull request');
    }
});
