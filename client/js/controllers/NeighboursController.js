(function() {
    'use strict';
    angular

        .module('EleconsApp')
        .controller('NeighboursController', NeighboursController);

    function NeighboursController($scope, $route, $rootScope, ApiFactory, NeighboursFactory) {
        $scope.$route = $route
        var vm = this;

        ApiFactory.getUsers()
            .then(function(response) {
                let aUsers = response.data.users;

                $scope.showStatusNeighbours = function() {
                    if ($rootScope.neighboursPosition <= (aUsers.length / 2)) {
                        return true;
                    } else {
                        return false;
                    }
                };
            });

        NeighboursFactory.getNeighbours();
        NeighboursFactory.getNeighboursPosition();
    }
})();
