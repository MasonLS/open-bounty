//this directive is used for the poup
'use strict';

app.directive('ngConfirmClick', [
    function() {
        return {
            link: function(scope, element, attr) {
                var msg = attr.ngConfirmClick || 'Are you sure?';
                var clickAction = attr.confirmedClick;
                element.bind('click', (event) => {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction);
                    }
                });
            }
        };
    }
])
