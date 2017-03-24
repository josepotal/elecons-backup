angular.module('EleconsApp')

  .controller('PrivateCtrl', function($scope, auth, DataFactory) {
    console.log(auth)
    DataFactory.getPrivateData()
      .then( ({ message }) => $scope.message = message )
  })
