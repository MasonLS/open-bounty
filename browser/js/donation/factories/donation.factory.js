app.factory('DonationFactory', ($http, $log) => {
  const DonationFactory = {};
  const getData = function(data) { return data.data; };

  DonationFactory.requestPayPalToken = (project, form) => {
    let data = {
      description: `Your donation for ${project.name}!`,
      amount: form.donationAmount.$viewValue,
      paypalEmail: form.paypalEmail.$viewValue,
      donorName: form.donorName.$viewValue,
      donationAnonymous: form.donationAnonymous.$viewValue,
      projectId: project.id
    }
    return $http.post('/api/donations/collect', data)
      .then(getData)
      .catch($log.error);
  }

  return DonationFactory;

});
