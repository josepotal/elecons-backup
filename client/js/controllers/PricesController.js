(function() {
    'use strict'
    angular
        .module('EleconsApp')
        .controller('PricesController', PricesController)

    function PricesController($scope, $route, $rootScope, PricesFactory) {
        $scope.$route = $route

        var vm = this;
        $rootScope.minPrice = {};
        $rootScope.maxPrice = {};

        PricesFactory.getPrices()
            .then(function(response) {
                var sortedPrices = response.sort(function(a, b) {
                    return a.price - b.price;
                });

                $rootScope.min = sortedPrices[0];
                $rootScope.max = sortedPrices[sortedPrices.length - 1];

            });
    }
})();

