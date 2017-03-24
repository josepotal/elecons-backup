angular.module('EleconsApp')

  .controller('NavbarCtrl', function($scope, $location, AuthFactory) {

    $scope.logout = function() {
      AuthFactory.logout()
      $location.path('/dashboard');
    };
  });