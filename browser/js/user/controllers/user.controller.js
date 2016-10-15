'use strict';

app.controller('UserCtrl', function($rootScope, featuredProjects, $scope, ProjectsFactory, $uibModal) {
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
    console.log('featuredProjects:', featuredProjects);
    
    let projects = [];
    let tempArr = [];

    for (let i = 0; i < featuredProjects.length; i++) {
        if (i % 3 === 0) {
            projects.push(tempArr);
            tempArr = [];
        } else {
            tempArr.push(featuredProjects[i]);
        }
    }

    $scope.featuredProjects = projects;

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
