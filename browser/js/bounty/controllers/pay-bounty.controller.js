app.controller('PayModalCtrl', ($scope, $uibModal) => {
    $scope.openPaymentModal = (bounty) => {
        $uibModal.open({
            templateUrl: '/js/bounty/templates/pay-bounty-modal.html',
            controller: 'PayModalInstanceCtrl',
            resolve: {
                items: () => {
                    return {
                        bounty: bounty
                    }
                }
            }
        });
    };
});

app.controller('PayModalInstanceCtrl', ($scope, $uibModalInstance, $log, $state, items, PayoutFactory) => {

    $scope.bounty = items.bounty;
    $scope.form = {};

    $scope.completePayment = () => {
        if ($scope.form.payoutForm.$valid) {

          PayoutFactory.payout($scope.bounty, $scope.form.payoutForm)
            .then(data => {
                if (data.status === 'ok') {
                    $state.reload();
                    $uibModalInstance.close();
                }
            })
            .catch($log.error);
        }
    };
});
