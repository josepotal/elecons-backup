(function() {
    'use strict';
    angular

        .module('EleconsApp')
        .controller('PowerController', PowerController);

    function PowerController($rootScope, $scope, $route, $interval, socketio, ApiFactory) {
        $scope.$route = $route;
        const id = $scope.loggedUser.id;

        $scope.showStatusPower = function() {
            if ($rootScope.maxPower < $rootScope.contractedPower) {
                return true;
            } else {
                return false;
            }
        };

        $interval(() => {
            socketio.emit("userInfo", {
                id: $rootScope.username,
                urlCurrentPower: $rootScope.urlCurrentPower
            });
        }, 2000);

        socketio.on('new read', function(data) {
            $rootScope.current = data.current;
            $rootScope.currentKW = ($rootScope.current) / 1000;
            $rootScope.date = data.date;
            $rootScope.maxPower = ($rootScope.currentKW > $rootScope.maxPower) ? $rootScope.currentKW : $rootScope.maxPower;
            ApiFactory.maxPower(id, $rootScope.maxPower);
        });
    }

})();
