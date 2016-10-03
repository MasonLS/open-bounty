app.config(function ($stateProvider) {

    $stateProvider.state('donate', {
        url: '/donate',
        controller: 'DonationCTRL',
        templateUrl: 'js/donation/templates/donation.template.html'
    });


    $stateProvider.state('donateId', {
        url: '/donate/:projectId',
        controller: 'DonationCTRL',
        templateUrl: 'js/donation/templates/donation.template.html'
    });
});
