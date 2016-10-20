'use strict';

app.config($stateProvider => {

    // Register our *about* state.
    $stateProvider.state('about', {
        url: '/about',
        controller: 'AboutController',
        templateUrl: 'js/about/about.html'
    });

});

app.controller('AboutController', ($scope, FullstackPics) => {

    // Images of beautiful Fullstack people.
    $scope.images = _.shuffle(FullstackPics);

});
