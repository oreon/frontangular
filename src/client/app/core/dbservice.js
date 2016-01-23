(function () {

   'use strict';

  angular.module('app.core').factory('dbService', dbService);

  dbService.$inject = ['$q', 'logger' ];

   function dbService($q, logger){

	    this.getEntity = function (id, service, edit) {

            if(edit){
             return service.getWritable({id:id}).$promise
                .then(getFetchComplete)
                .catch(getFetchFailed);
            }else{
                 return this.readRecord(id, service);
            }

            function getFetchComplete(response) {
                return response;
            }

            function getFetchFailed(error) {
                logger.error(' Failed getting record ' + id + ' - ' + error.data);
            }
        }

        this.readRecord = function(id, service){
            var deferred = $q.defer(),
            cacheKey = id,
            data = service.cache.get(cacheKey);

            if (data) {
                console.log("Found data inside cache", data);
                deferred.resolve(data);
            } else {
                service.getComplete({id:id}).$promise
                .then(getFetchComplete)
                .catch(getFetchFailed);

                 function getFetchComplete(response) {
                     service.cache.put(cacheKey, response);
                     deferred.resolve(response);
                 }

                function getFetchFailed(error) {
                    logger.error(' Failed getting record ' + service.getName() +  id + ' - ' + error.data);
                }
            }

            return deferred.promise;
        }

        this.getEntityList = function (service) {
            var deferred = $q.defer(),
            cacheKey = "all",
            data = service.cache.get(cacheKey);

            if (data) {
                console.log("Found data inside cache", data);
                deferred.resolve(data);
            } else {
                service.query().$promise
                                .then(getFetchComplete)
                                .catch(getFetchFailed);

                function getFetchComplete(response) {
                    console.log("Received data via HTTP");
                    service.cache.put(cacheKey, response.results);
                    deferred.resolve(response.results);
                    //return response.results;
                }

                function getFetchFailed(error) {
                    logger.error('Failed fetching list ' + error.data);
                    deferred.reject();
                }
            }
            return deferred.promise;
        }

        this.getEntityListFromService = function (service) {
             return service.query();

        }

        this.saveEntity = function (entity, service){
            // Create new Employee object
            if(!entity.id)
                entity = new service(entity);

            return entity.$save()
                       .then(saveComplete)
                       .catch(saveFailed);

            function saveComplete(response) {
               service.cache.put(response.id, response);
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

