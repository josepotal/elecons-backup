(function() {
    'use strict';
    angular

        .module('EleconsApp')
        .controller('NeighboursController', NeighboursController);

    function NeighboursController($scope, $route, $rootScope, ApiFactory, NeighboursFactory) {
        $scope.$route = $route
        var vm = this;

        //chart neighbours comparison
        NeighboursFactory.getNeighbours();

        ApiFactory.getUsers()
            .then(function(response) {
                let aUsers = response.data.users;
                vm.users = aUsers 
                vm.showStatusNeighbours = function() {
                    if (vm.neighboursPosition <= (aUsers.length / 2)) {
                        return true;
                    } else {
                        return false;
                    }
                };
            });

        ApiFactory.getUser()
            .then(({ data }) => {
                vm.username = data.username
            });


        //fillings positioning data values
        NeighboursFactory.getNeighboursPosition()
            .then(getPosition)
        

        function getPosition(response) {
            let positionArray = 0
            
            let positioning = response.forEach(function(elem, index) {
                if (elem.username == vm.username) {
                    positionArray = index + 1
                    return positionArray
                }

            })
            vm.neighboursPosition = positionArray

        }
            
    }
})();
