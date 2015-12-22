


var skillService = angular.module('app.core').factory('skillService', function ($resource, $cacheFactory, API_BASE_URL) {
    baseUrl = API_BASE_URL;
    
    var employeeCache = $cacheFactory('Skills');
        
    
    var res =   $resource(baseUrl + '/skills/:id', {id: '@id'}, {
        query: {
            method: 'GET',
            isArray: false,
           // cache: skillCache
        },
        'update': { method:'PUT' , url: baseUrl + '/skillsWritable/:id' },
        'create': { method:'POST' , url: baseUrl + '/skillsWritable/:id'},
        get: { method:'GET', 
         //cache: skillCache
        },
         'getComplete':{
            method:'GET',
            url: baseUrl + '/skillsComplete/:id'
        },
        'getWritable': { 
            method:'GET',
            url: baseUrl + '/skillsWritable/:id'
         //cache: skillCache
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

