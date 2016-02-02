


var skillService = angular.module('app.core').factory('skillService', function ($resource, CacheFactory, API_BASE_URL) {
    baseUrl = API_BASE_URL;


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

    res.cache =  CacheFactory('skillCache', {maxAge: 5 * 60 * 1000  , storageMode: 'localStorage' } ) // 1 hour,

    res.getCacheValue = function(key){
        if(key)
            retval = res.cache.get(key);
        else{
            retval = res.cache.keys().map(function(obj){
                return res.cache.get(obj);
            });
            if(retval.length == 0 ){
                return null ;
            }
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

    res.prototype.$save = function() {
        if (this.id) {
            return this.$update();
        } else {
            return this.$create();
        }
    }

    return res;
});

