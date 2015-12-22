
(function () {
    'use strict';

    angular
        .module('app.employee')
        .controller('EmployeeController',  EmployeeController);

     EmployeeController.$inject = ['logger',
        '$stateParams',
        '$location',
        'TableSettings',
        'ngTableParams',
        'Api',];
    /* @ngInject */
    function  EmployeeController(logger,
        $stateParams,
        $location,
        TableSettings,
        ngTableParams,
        Api
        ) {

        var vm = this;
      
        vm.employees = [];
        vm.tableParams =   new ngTableParams( );//TableSettings.getParams( Employee);
        vm.employee = {};
        vm.skills  = [];
        
          vm.checkModel = {
            left: false,
            middle: true,
            right: false
        };
       
     
        activate();

        function activate() {
            if(!$stateParams.id){
                vm.tableParams.settings({dataset: vm.employees});
                getEmployees();
            }
            
        }
        
        vm.toEditEmployee = function(){
            Api.getEmployeeForEdit($stateParams.id).then(function(data) {  
                 vm.employee = data
                 
                 getDepartments();
                 getSkills();
                 
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
                    logger.info('Activated  Employees View');
                    return vm.employees;
                });
        }
        
      
       vm.departments  = [];
       
		function getDepartments() {
            return Api.getDepartments()
                .then(function(data) {
                    vm.departments = data;
                });
        }
        
        
        
       
		function getSkills() {
            return Api.getSkills()
                .then(function(data) {
                    vm.skills = data;
                });
        }
        
        
	  
        vm.addEmployeeSkill = function() {
            var item = {};
            
            if(!vm.employee.employeeSkills){
                vm.employee.employeeSkills =[];
            }
            vm.employee.employeeSkills.push(item);
            
           
        }

        vm.removeEmployeeSkill = function(index) {
            vm.employee.employeeSkills.splice(index, 1);
        }
     
       
        vm.create = function() {
            if(!vm.employee.id )
                vm.employee.dob = "1988-11-01";
        };
        
        vm.remove = function( employee){
            return Api.removeEmployee( employee).then(function (data){  
                logger.success('Employee Deleted');
                $location.path('employee');
            });
        }
 
        vm.update = function() {
            var msg = 'updated';
            if(!vm.employee.id ){
                vm.create();
                msg = 'created';
            }
                 
            return Api.saveEmployee(vm.employee).then(function (data){  
                logger.success('Employee ' + msg );
                $location.path('employee/' + data.id);
            });
        };
    
    }

})();
