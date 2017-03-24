(function() {
  'use strict'
  
  angular
        .module('EleconsApp')
        .factory('ApiFactory', ApiFactory)

    function ApiFactory($http, $rootScope, $routeParams) {

        return {
            getUsers:getUsers,
            getUser:getUser,
            updateUser:updateUser,
            maxPower:maxPower,
            getData:getData
        };

        function getUsers() {
            var url = '/api/users';
            return $http.get(url);
        }

        function getUser(id) {
            let userId = $rootScope.loggedUser.id;
            var url = `/api/users/${userId}`;
            return $http.get(url);
        }

        function updateUser(id, firstName, lastName, email, contractedPower, energyTariff, updatedAt, urlCurrentPower) { //, consumption2016, consumption2017
            const data = { id, firstName, lastName, email, contractedPower, energyTariff, updatedAt, urlCurrentPower }; //, consumption2016, consumption2017
            var url = `/api/users/${id}`;
            console.log(data);
            return $http.put(url, data);
        }

        function maxPower(id, maxPower) {
            let data = { id, maxPower };
            var url = `/api/users/${id}/maxPower`;
            return $http.put(url, data);
        }

        function getData(id) {
            let userId = $rootScope.loggedUser.id;
            var url = `/api/users/${userId}/data`;
            return $http.get(url);
        }
       
    }
})()
