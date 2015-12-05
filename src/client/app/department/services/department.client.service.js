(function() {
    'use strict';

    angular
        .module('app.department')
        .factory('Department', Department);

    Department.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Department($resource, API_BASE_URL) {

        var params = {
            id: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };  
        
        API_BASE_URL = "http://localhost:8000/api/v1";

        var API_URL = API_BASE_URL + '/fullDepartments/:id';

        return $resource(API_URL, params, actions);

    }

})();
