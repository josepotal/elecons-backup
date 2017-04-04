angular

  .module('EleconsApp')
  .factory('DataFactory', DataFactory)

  DataFactory.$inject = ['$http']

  function DataFactory($http){

    return { 
      getPrivateData 
    }

    function getPrivateData() {
      const url = '/private'
      return $http.get(url)
        .then( response => response.data )
    }

  }