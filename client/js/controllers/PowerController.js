// (function() {
//     'use strict';
//     angular

//         .module('EleconsApp')
//         .controller('PowerController', PowerController);

//     function PowerController($rootScope, $scope, $route, PowerFactory) {
//         $scope.$route = $route;
//         const id = $scope.loggedUser.id;

//         $scope.showStatusPower = function() {
//             if ($rootScope.maxPower < $rootScope.contractedPower) {
//                 return true;
//             } else {
//                 return false;
//             }
//         };

//         PowerFactory.getPowerData()
//     }

// })();
