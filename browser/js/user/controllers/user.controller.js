'use strict';

app.controller('UserCtrl', function($rootScope, userProjects, featuredProjects, $scope, ProjectsFactory, $uibModal) {
    // detachAndScopeBounties(starredProjects);

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
	}

    $scope.openDonationWindow = (project) => {

        $uibModal.open({
            templateUrl: '/js/donation/templates/donation.modal.template.html',
            controller: 'DonationModalInstanceCtrl',
            windowClass: 'donation-modal',
            resolve: {
                items: () => {
                    return {
                        project: project
                    }
                }
            }
        });
    };

    $scope.featuredProjects = _.chunk(userProjects, 3);

    $scope.searchProjects = function (searchTerm) {
        return ProjectsFactory.searchProjects(searchTerm)
            .then(projects => {
                $scope.projects = projects;
            })
    }

    $scope.searchBounties = function(searchTerm) {
        return ProjectsFactory.searchProjects(searchTerm)
            .then(projects => {
                detachAndScopeBounties(projects);
            });
    }
});
