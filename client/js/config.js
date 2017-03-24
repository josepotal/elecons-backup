angular.module('EleconsApp')
  
  // Innterceptors
    .config( function ($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor')
    })

  // Anuglar routes
    .config(function($routeProvider){
        $routeProvider
            .when('/',{
              templateUrl: '/templates/home.html',
            })
            .when('/login',{
              templateUrl: '/templates/login.html',
              controller: 'LoginCtrl'
            })
            .when('/register',{
              templateUrl: '/templates/register.html',
              controller: 'RegisterCtrl'
            })
            .when('/dashboard', {
                templateUrl: '/templates/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm',
                activetab: 'dashboard',
                secure: true
            })
            .when('/neighbours', {
                templateUrl: '/templates/neighbours.html',
                controller: 'NeighboursController',
                controllerAs: 'vm',
                activetab: 'neighbours',
                secure: true
            })
            .when('/charts', {
                templateUrl: '/templates/charts.html',
                controller: 'ChartsController',
                controllerAs: 'vm',
                activetab: 'charts',
                secure: true
            })
            .when('/power', {
                templateUrl: '/templates/power.html',
                controller: 'PowerController',
                controllerAs: 'vm',
                activetab: 'power',
                secure: true
            })
            .when('/prices', {
                templateUrl: '/templates/prices.html',
                controller: 'PricesController',
                activetab: 'prices',
                secure: true
            })
            .when('/user', {
                templateUrl: '/templates/user.html',
                controller: 'UserController',
                activetab: 'user',
                secure: true
            })
            .otherwise('/home');
    });
