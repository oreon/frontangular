(function () {
    'use strict';

    angular
        .module('app.employee')
        .controller('EmployeeController', EmployeeController);

    EmployeeController.$inject = ['logger',
        '$stateParams',
        '$location',
        'TableSettings',
        'ngTableParams',
        'Api',];
    /* @ngInject */
    function EmployeeController(logger,
        $stateParams,
        $location,
        TableSettings,
        ngTableParams,
        Api
        ) {

        var vm = this;
      
        vm.employees = [];
        vm.tableParams =   new ngTableParams( );//TableSettings.getParams(Employee);
        vm.employee = {};
        vm.departments = [];
     
         activate();

        function activate() {
            if(!$stateParams.id){
                vm.tableParams.settings({dataset: vm.employees});
                getEmployees();
            };
        }
        
        vm.toEditEmployee = function(){
            Api.getEmployeeForEdit($stateParams.id).then(function(data) {  
                 vm.employee = data
                 getDepartments();
            });
        }
        
         vm.toViewEmployee = function(){
            Api.getEmployee($stateParams.id).then(function(data) {  
                  vm.employee = data
            });
        }
        
        function getEmployees() {
            return Api.getEmployees()
                .then(function(data) {
                    vm.employees = data;
                    logger.info('Activated Employees View');
                    return vm.employees;
                });
        }
        
        function getDepartments() {
            return Api.getDepartments()
                .then(function(data) {
                    vm.departments = data;
                    return vm.departments;
                });
        }
        
        vm.create = function() {
            if(!vm.employee.id )
                vm.employee.dob = "1988-11-01";
        };
        
        vm.remove = function(employee){
            return Api.removeEmployee(employee).then(function (data){  
                logger.success('Employee Deleted');
                $location.path('employee');
            });
        }
 
        vm.update = function() {
            if(!vm.employee.id ){
                vm.create();
            }
                 
            return Api.saveEmployee(vm.employee).then(function (data){  
                logger.success('Employee created');
                $location.path('employee/' + data.id);
            });
        };
    
    }

})();
