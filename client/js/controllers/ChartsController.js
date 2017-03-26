(function() {
    'use strict'
    angular

        .module('EleconsApp')
        .controller('ChartsController', ChartsController);

    function ChartsController($scope, $route, $rootScope, ChartsFactory) {
        $scope.$route = $route;
        var vm = this;

        //ChartsFactory.getChartNow();
        ChartsFactory.getChartHourly();
        ChartsFactory.getChartDaily();

    }
})()
