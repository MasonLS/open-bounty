app.factory('PayoutFactory', function($http, $log) {
    let PayoutFactory = {};
    let getData = response => response.data;

    PayoutFactory.payout = (bounty, form) => {
        let data = {
            amount: form.amount.$viewValue,
            receiver: form.paypalEmail.$viewValue,
            note: form.payoutMessage.$viewValue,
            bountyId: bounty.id
        }

        return $http.post('/api/donations/payout', data)
            .then(getData)
            .catch($log.error);
    };

    return PayoutFactory;
})
