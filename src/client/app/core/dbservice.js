(function () {
   
   'use strict';
       
  angular.module('app.core').factory('dbService', dbService);
   
  dbService.$inject = [ 'logger'];
  
   function dbService(logger){

	this.getEntity = function (id, service, edit) {
            
            if(edit){
             return service.getWritable({id:id}).$promise
                .then(getFetchComplete)
                .catch(getFetchFailed);
            }else{
                 return service.getComplete({id:id}).$promise
                .then(getFetchComplete)
                .catch(getFetchFailed);
            }
            
            function getFetchComplete(response) {
                return response;
            }
    
            function getFetchFailed(error) {
                logger.error('XHR Failed for employees' + error.data);
            }
        }
        
        this.getEntityList= function (service) {
             return service.query().$promise
                .then(getFetchComplete)
                .catch(getFetchFailed);
    
            function getFetchComplete(response) {
                return response.results;
            }
    
            function getFetchFailed(error) {
                logger.error('XHR Failed for employees' + error.data);
            }
          
        }
        
        this.saveEntity = function (entity, service){
            // Create new Employee object
            if(!entity.id)
                entity = new service(entity);
           
            return entity.$save(function(response) {
               return response.data;
            }, function(errorResponse) {
               logger.error(  errorResponse) ;
            });
            
        }
        
        this.removeEntity =  function (entity, service){  
            entity = new service(entity);
            return entity.$delete();
            //TODO : report delete failed
        }
        
        return this;
        
   }
   
})();
    
    