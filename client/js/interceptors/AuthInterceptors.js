angular.module('EleconsApp')
    .factory('AuthInterceptor', function(StorageFactory) {

        function request(config) {
            const { url } = config;

            // If it is an external API request... In this case REE
            if (url.includes('esios.ree.es')) {
                config.headers = config.headers || {};
                config.headers.Accept = 'application/json; application/vnd.esios-api-v1+json',
                    config.headers['Content-Type'] = 'application/json',
                    config.headers.Authorization = 'Token token="defb553f1d21b9541a83aad9642d8396bb10a939d4c0ed10fabab5d7d925fea1"'
            }
            // For any other request...
            else {
                const token = StorageFactory.readToken()
                    // if there's a token...
                if (token) {
                    config.headers = config.headers || {};
                    config.headers.Authorization = token
                }
            }
            return config;
        }

        return {
            request: request
        };


    })
