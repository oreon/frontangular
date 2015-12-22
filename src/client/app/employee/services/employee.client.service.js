var employeeService = angular.module('app.core').factory('employeeService', function ($resource, $cacheFactory, API_BASE_URL) {
        var employeeCache = $cacheFactory('Employees');
        
        baseUrl = API_BASE_URL;
        
        var res =   $resource(baseUrl + '/employees/:id', {id: '@id'}, {
            query: {
                method: 'GET',
                isArray: false
               // cache: employeeCache
            },
            'update': { method:'PUT' , url: baseUrl + '/employeesWritable/:id' },
            'create': { method:'POST' , url: baseUrl + '/employeesWritable/:id'},
            get: { method:'GET',
             //cache: employeeCache
            },
             'getComplete':{
                method:'GET',
                url: baseUrl + '/employeesComplete/:id'
            },
            'getWritable': { 
                method:'GET',
                url: baseUrl + '/employeesWritable/:id'
             //cache: employeeCache
            },
        } );           
           
        res.prototype.$save = function() {
            if (this.id) {
                return this.$update();
            } else {
                return this.$create();
            }
        }
        
        return res;
    });