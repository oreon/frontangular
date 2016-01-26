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
                service.getComplete({id:id, related:relatedObjects}).$promise
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

        this.getEntityList = function (service) {
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
                service.query().$promise
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
               service.setCacheValue(response.id, response);
               return response;
            }

            function saveFailed(errorResponse) {
               logger.error(  errorResponse) ;
            };

        }

        this.removeEntity =  function (entity, service){
            entity = new service(entity);
            return entity.$delete();
            //TODO : report delete failed
        }

        return this;

   }

})();

