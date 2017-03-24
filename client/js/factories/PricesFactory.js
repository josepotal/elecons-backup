(function() {
    'use strict'
    angular
        .module('EleconsApp')
        .factory('PricesFactory', PricesFactory)

    function PricesFactory($http, $rootScope) {

        var servicePrices = {
            getPrices: getPrices
        }

        return servicePrices

        // method of the factory. REE API

        function getPrices() {

            let indicator = 10229
            if ($rootScope.energyTariff === "PVPC") {
                indicator = 10229
            } else if ($rootScope.energyTariff === "PVPC DH") {
                indicator = 10230
            } else {
                indicator = 10231
            }

            var req = {
                method: 'GET',
                url: `https://api.esios.ree.es/indicators/${indicator}`,
                headers: {
                    "Accept": "application/json; application/vnd.esios-api-v1+json",
                    "Content-Type": "application/json",
                    "Authorization": 'Token token="defb553f1d21b9541a83aad9642d8396bb10a939d4c0ed10fabab5d7d925fea1"',
                },
                dataType: 'json',
            }

            return $http(req)
                .then(getPvpc)
                .then(filterPvpc)
        }
    }


        //Helper functions
        function getPvpc(response) {
            return response.data.indicator.values
        }

        function filterPvpc(response) {
            let aPrices = response.map(function(obj) {
                var pricesObj = {
                    hour: obj.datetime.substring(obj.datetime.indexOf('T') + 1, obj.datetime.indexOf('.') - 3) + 'h',
                    date: obj.datetime.substring(0, obj.datetime.indexOf('T')),
                    price: +(obj.value / 1000).toFixed(3)
                }
                return pricesObj
            })
            return aPrices
        }

})()
