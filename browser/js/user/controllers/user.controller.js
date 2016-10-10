'use strict';

app.controller('UserCtrl', function($scope, starredProjects, ProjectsFactory, BountyFactory, user, userBounties) {
	
	$scope.user = user;

    detachAndScopeBounties(starredProjects);

    function isNotUserBounty (bounty) {
    	return userBounties.every(userBounty => {
    		return userBounty.id !== bounty.id;
    	});
    }

    function detachAndScopeBounties(projects) {
    	let bounties = [];

	    projects.forEach(project => {
	        project.bounties.forEach(bounty => {
	            bounties.push(bounty);
	        })
	    });

	    $scope.bounties = bounties.filter(isNotUserBounty);

	    console.log('BOUNTIES', $scope.bounties)
	}

    $scope.searchBounties = function(searchTerm) {
        return ProjectsFactory.searchProjects(searchTerm)
            .then(projects => {
                detachAndScopeBounties(projects);
            });
    }

    $scope.trackBounty = function(bountyId) {
        return BountyFactory.track(bountyId)
            .then(_ => {
                let indexOfTrackedBounty;
                for (var i = 0; i < $scope.bounties.length; i++) {
                    if ($scope.bounties[i].id === bountyId) {
                        indexOfTrackedBounty = i;
                        break;
                    }
                }
                userBounties.push($scope.bounties.splice(i, 1)[0]);
            });
    }
});
