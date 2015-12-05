(function() {
    'use strict';

    angular
        .module('app.employee')
        .factory('Employee', Employee);

    Employee.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Employee($resource, API_BASE_URL) {

        var params = {
            id: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };
        
        API_BASE_URL = "http://localhost:8000/api/v1"

        var API_URL = API_BASE_URL + '/employees22/:id';

        return $resource(API_URL, params, actions);

    }

})();
