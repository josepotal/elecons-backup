angular.module('EleconsApp')

  .controller('RegisterCtrl', function($scope, AuthFactory, ApiFactory, $window) {
    $scope.register = function() {
      const username = $scope.username;
      const password = $scope.password;
      AuthFactory.register({ username, password });
  };
});