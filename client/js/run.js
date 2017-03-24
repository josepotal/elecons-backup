angular.module('EleconsApp')
  .run(function($rootScope, $location, StorageFactory, AuthFactory, ApiFactory){

      if ( AuthFactory.isLoggedIn() ) {
        const token = StorageFactory.readToken();
        AuthFactory.setCredentials(token);
      }

      $rootScope.$on( "$routeChangeStart", function(event, next, current) {

        if (next && next.secure) {
          if ( !AuthFactory.isLoggedIn() ) {
            $location.path("/login");
          }
        }
      
      });
      
      // when the user is logged we inizialize its value by getting the values on the DB
      $rootScope.$on( "userLogged", function(event, id) {
        ApiFactory.getUser(id)
            .then( response => {
                $rootScope.username = response.data.username;
                $rootScope.firstName = response.data.firstName || "Your firstName";
                $rootScope.lastName = response.data.lastName || "Your lastName";
                $rootScope.email = response.data.email || "Your email";
                $rootScope.maxPower = Number(response.data.maxPower) || 0;
                $rootScope.contractedPower = Number(response.data.contractedPower) || 2.3;
                $rootScope.energyTariff = response.data.energyTariff || "PVPC";
                $rootScope.updatedAt = response.data.updatedAt;
                $rootScope.urlCurrentPower = response.data.urlCurrentPower || "http://fran.noip.me:8888/consumo?id=0001";
                $rootScope.consumption2016 = response.data.dataUser.monthly[0];
                $rootScope.consumption2017 = response.data.dataUser.monthly[1];
                $rootScope.savingsKWH = $rootScope.consumption2016 - $rootScope.consumption2017;
                $rootScope.savingsEuro = $rootScope.savingsEuro  || ($rootScope.savingsKWH * 0.11);
            });      
      });
  });