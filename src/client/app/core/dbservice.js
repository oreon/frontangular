(function () {

   'use strict';

  angular.module('app.core').factory('dbService', dbService);

  dbService.$inject = ['$q', 'logger' ];

   function dbService($q, logger){

	    this.getEntity = function (id, service, edit, relatedObjects) {
            if(edit){
             return service.getWritable({id:id}).$promise
                .then(getFetchComplete)
                .catch(getFetchFailed);
            }else{
                 return this.readRecord(id, service, relatedObjects);
            }

            function getFetchComplete(response) {
                return response;
            }

            function getFetchFailed(error) {
                logger.error(' Failed getting record ' + id + ' - ' + error.data);
            }
        }

        this.readRecord = function(id, service, relatedObjects){
            var deferred = $q.defer();
            var cacheKey = id;
            var cache = false;

            try {
                var data = service.getCacheValue(cacheKey);
                cache = true;
            }catch(err){
                console.log(err + " No cache forund for " + service.constructor.name)
            }

            if (data) {
                console.log("Found data inside cache", data);
                deferred.resolve(data);
            } else {
                service.getComplete({id:id}).$promise
                .then(getFetchComplete)
                .catch(getFetchFailed);

                 function getFetchComplete(response) {
                     if(cache)
                        service.setCacheValue(cacheKey, response);
                     deferred.resolve(response);
                 }

                function getFetchFailed(error) {
                    logger.error(' Failed getting record ' + service.name +  id + ' - ' + error.data);
                }
            }

            return deferred.promise;
        }

        this.getEntityList = function (service, additionalParams) {
            var deferred = $q.defer();
            var cacheKey = "all";
            var cache = false
            try {
                var data = service.getCacheValue();
                cache = true;
            }catch(err){
                console.log(err + " No cache forund for " + service.constructor.name)
            }

            if (data) {
                console.log("Found data inside cache", data);
                deferred.resolve(data);
            } else {
                service.query(additionalParams).$promise
                                .then(getFetchComplete)
                                .catch(getFetchFailed);

                function getFetchComplete(response) {
                   console.log("Received data via HTTP");
                    if(cache)
                        service.setCacheValue(cacheKey, response.results);
                   deferred.resolve(response.results);
                }

                function getFetchFailed(error) {
                    logger.error('Failed fetching list ' + error.data);
                    deferred.reject();
                }
            }
            return deferred.promise;
        }

        this.saveEntity = function (entity, service){
            // Create new Employee object
            if(!entity.id)
                entity = new service(entity);

            return entity.$save()
                       .then(saveComplete)
                       .catch(saveFailed);

            function saveComplete(response) {
                if(service.setCacheValue)
                    service.setCacheValue(response.id, response);
               return response;
            }

            function saveFailed(errorResponse) {
               logger.error(  errorResponse) ;
            };

        }

       //TO be used if updating a child element in cache - currently unused
       this.updateCacheWhenChildChanged = function(newval, parentid, relationName, service){
            var parent = service.getCacheValue(parentid)
           if(!parent)
               return;
            var arrChildren = parent[relationName];
            var emp =arrChildren.filter(function(obj) { return obj['id'] == newval.id })
            if(emp.length == 0 ){
                arrChildren.push(newval)
            }else{
                arrChildren.forEach(function(item, i) { if (item.id == newval.id) arr[i] = newval; });
            }
       }

        this.removeEntity =  function (entity, service){
            entity = new service(entity);
            return entity.$delete();
            //TODO : report delete failed
        }

        return this;

   }

})();

