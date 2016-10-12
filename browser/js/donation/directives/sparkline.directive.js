'use strict';

app.directive('jqSparkline', [function() {

    return {
        restrict: 'AE',
        scope: {
            sparkData: '='
        },
        link: function(scope, elem, attrs) {
            var opts = {};
            opts.type = attrs.type || 'line';

            scope.$watch(attrs.opts.sparkData, function() {
                render();
            });
            var render = function() {
                var data;
                if (attrs.opts) angular.extend(opts, angular.fromJson(attrs.opts));
                data = scope.sparkData;
                $(elem).sparkline(data, opts);
            };
        }
    }
}]);
