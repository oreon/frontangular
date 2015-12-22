
var departmentService = angular.module('app.core').factory('departmentService', function ($resource, $cacheFactory, API_BASE_URL) {
    baseUrl = API_BASE_URL;
    
    var departmentCache = $cacheFactory('Departments');
 
    var res =   $resource(baseUrl + '/departments/:id', {id: '@id'}, {
        query: {
            method: 'GET',
            isArray: false,
           // cache: departmentCache
        },
        'update': { method:'PUT' , url: baseUrl + '/departmentsWritable/:id' },
        'create': { method:'POST' , url: baseUrl + '/departmentsWritable/:id'},
        get: { method:'GET', 
         //cache: departmentCache
        },
         'getComplete':{
            method:'GET',
            url: baseUrl + '/departmentsComplete/:id'
        },
        'getWritable': { 
            method:'GET',
            url: baseUrl + '/departmentsWritable/:id'
         //cache: departmentCache
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





