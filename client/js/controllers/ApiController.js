(function() {
    'use strict'
    angular
    
        .module('EleconsApp')
        .controller('ApiController', ApiController)

        ApiController.$inject = ['ApiFactory', '$rootScope', '$scope', '$route', '$routeParams']

    function ApiController(ApiFactory, $rootScope, $scope, $route, $routeParams) {
        var vm = this;
        const id = $routeParams;

        ApiFactory.getUsers()
            .then(({ data }) => {
                vm.users = data.users;
            });

        ApiFactory.getUser()
            .then(({ data }) => {
                vm.user = data;
            });
    }
})();
