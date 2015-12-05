(function () {
    'use strict';

    var baseUrl = 'http://localhost:8000/api/v1';
    

    var employeeService = angular.module('app.core').factory('employeeService', function ($resource, $cacheFactory) {
        var employeeCache = $cacheFactory('Employees');
        
        var res =   $resource(baseUrl + '/employees/:id', {id: '@id'}, {
            query: {
                method: 'GET',
                isArray: false,
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
    
   var departmentService = angular.module('app.core').factory('departmentService', function ($resource, $cacheFactory) {
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

    var departmentServiceOriginal = angular.module('app.core').factory('departmentServiceOriginal', function ($resource, $cacheFactory) {
        var departmentCache = $cacheFactory('Department');
        
        return $resource(baseUrl + '/departments/:id', {id: '@id'}, {
            query: {
                method: 'GET',
                isArray: false
            },
            get: { method:'GET', cache: departmentCache},
        });
    });
   

    angular.module('app.core').factory('Api', Api);


    Api.$inject = ['$http', '$resource',  'logger', 'departmentService', 'employeeService'];



   function Api($http, $resource, logger, departmentService, employeeService) {
        var service = {
            getDepartments: getDepartments,
            getDepartment: getDepartment,
            getDepartmentComplete: getDepartmentComplete,
            getDepartmentForEdit:getDepartmentForEdit,
            saveDepartment:saveDepartment,
            removeDepartment:removeDepartment,

            getEmployees: getEmployees,
            getEmployee: getEmployee,
            getEmployeeForEdit:getEmployeeForEdit,
            saveEmployee:saveEmployee,
            removeEmployee:removeEmployee
        };


        var requestConfig = {
            /*
             headers: {
             'X-ZUMO-APPLICATION': 'GSECUHNQOOrCwgRHFFYLXWiViGnXNV88'
             }*/
        };

        return service;
        
        function getEmployee(id) {
            return getEntity(id, employeeService);
        }
        
        function getEmployeeForEdit(id) {
            return getEntity(id, employeeService, true);
        }
        
        
        function getEmployees() {
            return getEntityList(employeeService);
        }
        
        function saveEmployee(employee){
            return saveEntity(employee, employeeService);
        }
        
        function  removeEmployee(employee){
            return removeEntity(employee, employeeService);
        }
        
        function getDepartment(id) {
            return getEntity(id, departmentService);
        }
        
        function getDepartmentComplete(id) {
            return getDepartment(id);
        }

        function getDepartments() {
            return getEntityList(departmentService);
        }
        
        function saveDepartment(department){
            return saveEntity(department, departmentService);
        }
        
        function  removeDepartment(department){
            return removeEntity(department, departmentService);
        }
        
         function getDepartmentForEdit(id) {
            return getEntity(id, departmentService, true);
        }
        
        
        
        ////////////////////// Core functions /////////////////////////////
        

        function getEntity(id, service, edit) {
            
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
        
        function getEntityList(service) {
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
        
        function saveEntity(entity, service){
            // Create new Employee object
            if(!entity.id)
                entity = new service(entity);
           
            return entity.$save(function(response) {
               return response.data;
            }, function(errorResponse) {
               logger.error(  errorResponse) ;
            });
            
        }
        
        function removeEntity(entity, service){  
            entity = new service(entity);
            return entity.$delete();
            //TODO : report delete failed
        }
        
    }
})();
