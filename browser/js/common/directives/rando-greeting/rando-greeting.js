app.directive('randoGreeting', (RandomGreetings) => {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/rando-greeting/rando-greeting.html',
        link: (scope) => {
            scope.greeting = RandomGreetings.getRandomGreeting();
        }
    };

});
