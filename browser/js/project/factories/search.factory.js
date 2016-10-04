app.factory('SearchFactory', ($http) => {
    const SearchFactory = {};
    SearchFactory.searchProducts = (value) => {
        return $http.post('/api/search', { searchValue: value })
            .then(products => {
                return products.data;
            });
    };
    return SearchFactory;
});
