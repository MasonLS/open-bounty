app.controller('SearchCtrl', ($scope, SearchFactory) => {
    $scope.searchProducts = (value) => {
        return SearchFactory.searchProducts(value)
            .then(products => {
                return products;
            });
    };

    $scope.label = function(item) {
        return item.title + ' (' + item.type + ')';
    };

});
