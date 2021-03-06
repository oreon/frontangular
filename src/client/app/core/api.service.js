(function () {
    'use strict';

    angular.module('app.core').factory('Api', Api);

    Api.$inject = ['dbService', 'departmentService', 'employeeService', 'skillService'];

   function Api( dbService, departmentService, employeeService, skillService) {
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
            removeEmployee:removeEmployee,


            getSkills:getSkills,
            getSkill: getSkill,
            getSkillComplete: getSkillComplete,
            getSkillForEdit:getSkillForEdit,
            saveSkill:saveSkill,
            removeSkill:removeSkill,
        };

        return service;

        function getEmployee(id) {
            return dbService.getEntity(id, employeeService);
        }

        function getEmployeeForEdit(id) {
            return dbService.getEntity(id, employeeService, true);
        }


        function getEmployees(additionalParams) {
            return dbService.getEntityList(employeeService, additionalParams);
        }

        function saveEmployee(employee){
            var retval =  dbService.saveEntity(employee, employeeService);
   //         dbService.updateCacheWhenChildChanged(retval, retval.department, "employees", departmentService);
            return retval;
        }

        function  removeEmployee(employee){
            return dbService.removeEntity(employee, employeeService);
        }


        function getSkill(id) {
            return dbService.getEntity(id, skillService);
        }

        function getSkillComplete(id) {
            return getSkill(id);
        }

        function getSkills() {
            return dbService.getEntityList(skillService);
        }

        function saveSkill(skill){
            return dbService.saveEntity(skill, skillService);
        }

        function  removeSkill(skill){
            return dbService.removeEntity(skill, skillService);
        }

         function getSkillForEdit(id) {
            return dbService.getEntity(id, skillService, true);
        }

        function getDepartmentComplete(id, related) {
            return dbService.getEntity(id, departmentService, related);
        }

        function getDepartment(id) {
            return dbService.getEntity(id, departmentService);
        }



        function getDepartments() {
            return dbService.getEntityList(departmentService);
        }

        function saveDepartment(department){
            return dbService.saveEntity(department, departmentService);
        }

        function  removeDepartment(department){
            return dbService.removeEntity(department, departmentService);
        }

         function getDepartmentForEdit(id) {
            return dbService.getEntity(id, departmentService, true);
        }



    }
})();
