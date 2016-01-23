(function () {
    'use strict';

    angular
        .module('app.department')
        .controller('DepartmentController', DepartmentController);

    DepartmentController.$inject = ['logger',
        '$stateParams',
        '$location',
        'TableSettings',
        'ngTableParams',
        'Api',];
    /* @ngInject */
    function DepartmentController(logger,
        $stateParams,
        $location,
        TableSettings,
        ngTableParams,
        Api
        ) {

        var vm = this;

        var params = {
            page: 1,
            count: 5
        };

        var settings = {
            total: 0,
            counts: [5, 10, 15],
            filterDelay: 0
        };

        vm.departments = [];
        vm.tableParams =   new ngTableParams(params, settings );//TableSettings.getParams(Department);
        vm.department = {};
        vm.departments = [];



         activate();

        function activate() {

            if($stateParams.id){
                 return;
            }

             getDepartments().then(function() {
                logger.info('Activated Departments View')
                vm.tableParams.settings({dataset: vm.departments});
            });

        }

        vm.toEditDepartment = function(){
            Api.getDepartmentForEdit($stateParams.id).then(function(data) {
                 vm.department = data
                 getDepartments();
            });
        }

         vm.toViewDepartment = function(){
            Api.getDepartment($stateParams.id).then(function(data) {
                  vm.department = data
            });
        }

        function getDepartments() {
            return Api.getDepartments()
                .then(function(data) {
                    vm.departments = data;
                    //vm.departments.map(function (emp) { console.log(emp.firstName) });
                    return vm.departments;
                });
        }


        vm.create = function() {
        };

        vm.remove = function(department){
            return Api.removeDepartment(department).then(function (data){
                logger.success('Department Deleted');
                $location.path('/department');
            });
        }

        vm.update = function() {
            if(!vm.department.id ){
                vm.create();
            }

            return Api.saveDepartment(vm.department).then(function (data){
                logger.success('Department updated');
                $location.path('department/' + data.id);
            });

        };


    }

})();
