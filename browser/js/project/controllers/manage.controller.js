app.controller('ManageProjectCtrl', function($scope, BountyFactory, $state) {
    BountyFactory.getAll()
        .then(function(bounties) {
            console.log(bounties)
            $scope.bounties = bounties
        })


});
