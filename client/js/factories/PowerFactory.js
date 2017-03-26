// (function() {
//     'use strict';
//     angular
//         .module('EleconsApp')
//         .factory('PowerFactory', PowerFactory)

//     function PowerFactory($http, $rootScope, socketio, $interval, ApiFactory) {
//         const id = $rootScope.loggedUser.id;

//         var service = {
//             getPowerData: getPowerData
//         };

//         return service;

//         function getPowerData() {
//             $interval(() => {
//             socketio.emit("userInfo", {
//                 id: $rootScope.username,
//                 urlCurrentPower: $rootScope.urlCurrentPower
//             });
//         }, 2000);

//         socketio.on('new read', function(data) {
//             $rootScope.current = data.current;
//             $rootScope.currentKW = ($rootScope.current) / 1000;
//             $rootScope.date = data.date;
//             $rootScope.maxPower = ($rootScope.currentKW > $rootScope.maxPower) ? $rootScope.currentKW : $rootScope.maxPower;
//             ApiFactory.maxPower(id, $rootScope.maxPower);
//         });
//         }


//     }
// })()
