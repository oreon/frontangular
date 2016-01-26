
var departmentService = angular.module('app.core').factory('departmentService', function ($resource, CacheFactory, API_BASE_URL) {
    baseUrl = API_BASE_URL;

    //var departmentCache = $cacheFactory('Departments');

    var res =   $resource(baseUrl + '/departments/:id', {id: '@id'}, {
        query: {
            method: 'GET',
            isArray: false,
        },
        queryLookups: {
            method: 'GET',
            isArray: false,
            url: baseUrl + '/departmentsLookup'
        },
        'update': { method:'PUT' , url: baseUrl + '/departmentsWritable/:id' },
        'create': { method:'POST' , url: baseUrl + '/departmentsWritable/:id'},
        get: { method:'GET',

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

    res.cache =  CacheFactory('departmentCache', {maxAge: 5 * 60 * 1000  , storageMode: 'localStorage' } ) // 1 hour,

    res.getCacheValue = function(key){
        if(key)
            retval = res.cache.get(key);
        else{
            retval = res.cache.keys().map(function(obj){
                return res.cache.get(obj);
            });
        }
        return retval;
    }

    res.setCacheValue = function(key, val){
        if(Array.isArray(val)){
            val.map(function (obj){
                res.cache.put( obj.id, obj);
            })
        }else
            return res.cache.put(key, val);
    }


    return res;
});





