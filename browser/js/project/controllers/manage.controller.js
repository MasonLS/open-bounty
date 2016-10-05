app.controller('ManageProjectCtrl', ($scope,BountyFactory) => {
    // $scope.userProjects = userProjects;
    // console.log($scope.userProjects)
    BountyFactory.getAll()
        .then(bounties => {
            //console.log(bounties)
            $scope.bounties = bounties
        })

});
