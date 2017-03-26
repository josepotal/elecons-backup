(function() {
    'use strict';
    angular

        .module('EleconsApp')
        .controller('DashboardController', DashboardController);

    function DashboardController($scope, $route, $rootScope, DashboardFactory, ApiFactory) {
        $scope.$route = $route
        var vm = this;

        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        let currentDate = new Date;
        vm.currentYear = currentDate.getFullYear();
        vm.lastYear = vm.currentYear - 1;
        vm.currentMonth = monthNames[currentDate.getMonth()];

        $scope.showStatusDashboard = function() {
            if ($rootScope.consumption2016 > $rootScope.consumption2017) {
                return true
            } else {
                return false
            }
        }
        
        let electricPrice = 0.11
            ApiFactory.getUser()
                .then(response => {
                vm.consumption2016 = response.data.dataUser.monthly[0]
                vm.consumption2017 = response.data.dataUser.monthly[1]

                vm.savingsKWH = vm.consumption2016 - vm.consumption2017;
                vm.savingsEuro = vm.savingsKWH * electricPrice;
            })

        //DashboardFactory.getMonthData();
        DashboardFactory.getComparison();
    }
})()
