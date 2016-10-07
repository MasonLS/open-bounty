app.config(function ($stateProvider) {

    $stateProvider.state('donate', {
        url: '/donate',
        controller: 'DonationCTRL',
        templateUrl: 'js/donation/templates/donation.template.html'
    });


    $stateProvider.state('donateId', {
        url: '/project',
        params: {
            project: null
        },
        controller: 'DonateToProjectCtrl',
        templateUrl: 'js/donation/templates/donation-project.template.html'
    });
});
