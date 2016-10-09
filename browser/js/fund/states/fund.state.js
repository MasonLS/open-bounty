'use strict';

app.config($stateProvider => {

    $stateProvider.state('fundProject', {
        url: '/fund',
        templateUrl: 'js/fund/templates/fund.template.html',
    });
});
