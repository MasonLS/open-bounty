'use strict';

app.config(($stateProvider) => {

    $stateProvider.state('donate', {
        url: '/donate',
        controller: 'DonationCTRL',
        templateUrl: '/js/donation/templates/donation.template.html'
    });

    $stateProvider.state('donateId', {
        url: '/donate/:projectId',
        controller: 'DonationCTRL',
        templateUrl: '/js/donation/templates/donation-project.template.html'
    });

    $stateProvider.state('donateOk', {
        url: '/donation/ok',
        templateUrl: '/js/donation/templates/donation-ok.template.html'
    })
});
